const { Guilds } = require('../util/database')
const string = `\n\n**OBS:** O canal tem que ser apenas para rolls (\`$ma\`, \`$mk\`, \`$ha\`, \`$wa\`, \`$hg\`, \`$wg\`, etc...)`

module.exports = {
    name: 'channellist',
    aliases: ['chlist', 'chl', 'channelist'],
    description: "Comando para setar os canais onde o BOT pode agir",
    run: async (client, message, args, data) => {

        args = args.split(' ')

        if (['add', 'adicionar'].includes(args[0])) {
            const channel = await message.guild.channels.fetch(args[1] || '123').catch(e => null)
            
            if ( !channel ) return message.reply(`O ID inserido não é válido, tente novamente com outro canal${string}`)
            if ( data.canais.channelList.includes(channel.id) ) return message.reply(`✅ - O canal inserido já está liberado.`)

            await Guilds.findOneAndUpdate({ _id: message.guild.id }, { $push: { ['canais.channelList']: channel.id } })

            message.reply(`Canal ${channel} adicionado aos canais permitidos sucesso!${string}`)
            
        } else if (['remove', 'rm'].includes(args[0])) {
            const channel = await message.guild.channels.fetch(args[1] || '123').catch(e => null)

            if ( !channel ) return message.reply(`O ID inserido não é válido, tente novamente com outro canal`)
            if ( !data.canais.channelList.includes(channel.id) ) return message.reply(`[INFO] - O canal inserido não está na channellist`)

            await Guilds.findOneAndUpdate({ _id: message.guild.id }, { ['canais.channelList']: data.canais.channelList.filter(x => x !== channel.id) })

            message.reply(`Canal removido da channellist com sucesso! Agora, as reações de ${channel} não serão mais captadas.`)

        } else {
            let str = `\`${data.prefix}channellist add\` => Adicionar um canal\n`
                str +=`\`${data.prefix}channellist remove\` => Remover um canal\n`
                str +=`\n**Canais atuais:** ${data.canais.channelList.length}`,
                i = 0;
                if (data.canais.channelList.length != 0) str += '\n';
                data.canais.channelList.sort((x, y) => +x - +y).map(x => str += `\n[\`${++i}\`] - <#${x}>`)
                str += string
            message.reply({ embeds: [{ description: str }]})
        } 
    }
}