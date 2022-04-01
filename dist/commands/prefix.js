const { Guilds } = require('../util/database')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],
    description: "Comando para setar o prefixo",
    run: async(client, message, args, data) => {

        const prefixo = args.split(' ').join('').toLowerCase()

        if (!args) return message.reply(`Você precisa digitar qual vai ser o prefixo!\nEx: \`${data.prefix}prefix m.\``)
        if (args == 'reset' || args == client.config.prefix) {
            await Guilds.findOneAndUpdate({ _id: message.guild.id }, { $unset: { prefix: data.prefix }})
            return message.reply(`✅ | Prefixo alterado para o padrão (\`${client.config.prefix}\`) com sucesso!`)
        }
        if (prefixo.length > 5) return message.reply(`mano esse teu prefixo parece a bíblia\nTamanho máximo: \`5 carateres\``)
    
        await Guilds.findOneAndUpdate({ _id: message.guild.id }, { prefix: prefixo })

        message.reply(`✅ | Prefixo alterado para \`${prefixo}\` com sucesso!`)
    }
}