const { Personagens } = require('../util/database')
const formatTime = require('../util/formatTime')

module.exports = {
    name: 'search',
    description: "Comando que mostra as informações de determinada mensagem",
    run: async (client, message, args, data) => {

        args = args.split(' ')

        if (args[0] == 'msgid') {
            const d = (await Personagens.find({ ['ids.msg']: args[1] })).sort((x, y) => x.time - y.time)
            const embed = {
                description: `**Pesquisando pelas reações da mensagem com ID:** \`${args[1] || "Sem ID"}\`\n`
            }

            if (d.length == 0) {
                embed.description += `**Total:** 0\n\n_Talvez o ID não seja válido_...`
            } else {
                embed.description += `**Personagem:** \`${d[0].name}\`\n**Origem:** \`${d[0].from}\`\n**Total:** \`${d.length}\`\n`
                let i = 0;
                d.map(x => embed.description += `\n[\`${++i}\`] - <@${x.ids.user}>  - \`${formatTime(x.time)}\``)
                if (embed.description.length > 2000) {
                    return message.reply({ files: [{
                        attachment: Buffer.from(embed.description.replace(/\*\*|_|`/g, '')),
                        name: "log.txt"
                    }]})
                }
            }

            message.reply({ embeds: [embed] })
        } else {
            message.reply(`**Uso do comando:**\n\n\`${data.prefix}search msgid <id>\` => Busca pelas reações de determinada mensagem`)
        }
    }
}