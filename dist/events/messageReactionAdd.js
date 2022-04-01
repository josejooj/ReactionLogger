const { Personagens } = require('../util/database');
const formatTime = require('../util/formatTime')
const registrarServidor = require('../util/registrarServidor')

const msgs = {}

module.exports = {
    eventName: 'messageReactionAdd',
    once: false,
    run: async (client, reaction, user) => {

        if (user.id === client.config.mudae_id) return msgs[reaction.message.id] = Date.now()
        
        let timeToReact = Date.now() - (msgs[reaction.message.id] || reaction.message.createdTimestamp);

        try {

            if (timeToReact <= Math.floor((Math.random() * 11))) {
                timeToReact = Date.now() - reaction.message.createdTimestamp
                delete msgs[reaction.message.id]
            }
            
            if (timeToReact > 20000 || user.bot) return;

            const guild = await client.guilds.fetch(reaction.message.guildId)
            const channel = await guild.channels.fetch(reaction.message.channelId)
            const message = await channel.messages.fetch(reaction.message.id);
            const gdb = await registrarServidor(guild)

            if (!gdb.canais.log ||
                message.author.id !== client.config.mudae_id ||
                !gdb.canais.channelList.includes(channel.id) ||
                await Personagens.findOne({ ids: { user: user.id, msg: message.id } }).exec()) return;

            const emote = reaction.emoji.id ? "💖" : reaction.emoji.name;
            const embed = message.embeds[0];

            const embedToSend = {
                author: {
                    name: `${emote} | Reação adicionada! | ${emote}`
                },
                description: `**Usuário:** \`${user.tag}\`\n**Canal:** ${channel}\n**Mensagem:** [Ir para a mensagem](https://discord.com/channels/${guild.id}/${channel.id}/${message.id})\n**Personagem:** \`${embed.author.name}\`\n**De:** \`${embed.description.split('\n')[0]}\``,
                image: {
                    url: embed.image.url
                },
                footer: {
                    text: "Tempo: " + formatTime(timeToReact)
                }
            };

            (await client.channels.fetch(gdb.canais.log)).send({ embeds: [embedToSend] })

            const a = await new Personagens({
                _id: Date.now(),
                name: embed.author.name,
                from: embed.description.split('\n')[0],
                time: timeToReact,
                mr: msgs[reaction.message.id] ? true : undefined,
                ids: {
                    user: user.id,
                    guild: guild.id,
                    channel: channel.id,
                    msg: message.id
                }
            }).save()

            delete a;
            delete timeToReact, guild, channel, message
        } catch (e) {
            if (e.code == 11000) {
                await new Personagens({
                    _id: Date.now() + 1,
                    name: embed.author.name,
                    from: embed.description.split('\n')[0],
                    time: timeToReact,
                    ids: {
                        user: user.id,
                        guild: guild.id,
                        channel: channel.id,
                        msg: message.id
                    }
                }).save()
            }
            console.log(e)
        }
    }
}

setInterval(() => {
    for (const x in msgs) {
        if (Date.now() - msgs[x] > 20000) delete msgs[x];
    }
}, 1000 * 60)