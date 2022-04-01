const { Guilds } = require('../util/database')

module.exports = {
    name: 'setlog',
    aliases: ['setlogchannel', 'log'],
    description: "Comando para setar o canal de LOGs",
    run: async (client, message, args, data) => {

        if (!args) return message.reply(`Você precisa inserir o ID do canal de Log!\nEx: \`${data.prefix}setlog <id>\`\n\nDica: Para remover o canal de log basta usar \`${data.prefix}setlog remove\`\n\n**Canal de logs atual**: ${data.canais.log? `<#${data.canais.log}>`:"Nenhum"}`)
        if (args == data.canais.log) return message.reply(`:thinking: - Mas esse já é seu canal de LOGs...`)
        if (args == 'remove' && data.canais.log) {
            await Guilds.findOneAndUpdate({ _id: message.guild.id }, { $unset: { ['canais.log']: data.canais.log || "" } });
            message.reply(`✅ | O canal de LOGs foi desativado com sucesso!`)
        } else {
            const channel = await message.guild.channels.fetch(args || '123').catch(e => null)

            if (!channel) return message.reply(`O canal com ID \`${args || '0'}\` não existe! Tente outro.`)

            await Guilds.findOneAndUpdate({ _id: message.guild.id }, { ['canais.log']: channel.id })

            message.reply(`✅ | O canal de LOGs foi alterado com sucesso para ${channel}\nAgora, a cada reação o log será enviado naquele canal`)
        }        
    }
}