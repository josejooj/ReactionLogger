const { Guilds } = require('../util/database')

module.exports = {
  name: 'setrank',
  aliases: ['setrankchannel'],
  description: "Comando para setar o canal de Ranking",
  run: async (client, message, args, data) => {

    console.log(data)
    if (!args) return message.reply(`Você precisa inserir o ID do canal de rank!\nEx: \`${data.prefix}setrank <id>\`\n\nDica: Para remover o canal de rank basta usar \`${data.prefix}setrank remove\`\nO canal de rank atual é: ${data.rank?.canal? `<#${data.rank.canal}>`:"`Nenhum`"}`)

    if (args == 'remove' && data.rank?.canal) {
      await Guilds.findOneAndUpdate({ _id: message.guild.id }, { $unset: { ['rank.canal']: data.rank?.canal || "" } });
      message.reply(`✅ | O canal de Ranks foi desativado com sucesso!`)
    } else {
      const channel = await message.guild.channels.fetch(args || '123').catch(e => null)

      if (!channel) return message.reply(`O canal com ID \`${args || '0'}\` não existe! Tente outro.`)

      await Guilds.findOneAndUpdate({ _id: message.guild.id }, { ['rank.canal']: channel.id });
      message.reply(`✅ | O canal de Ranks foi alterado com sucesso para ${channel}\nAgora, a cada 10 minutos o rank será enviado naquele canal`)
    }
  }
}