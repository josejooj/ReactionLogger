const { generateServer, generateGlobal, generateUsers } = require('../util/rank')

module.exports = {
    name: 'rank',
    description: "Comando que mostra o rank de melhor tempo",
    run: async (client, message, args, data) => {

        if (['local', 'server', 'servidor'].includes(args)) return message.reply({ embeds: [{ description: await generateServer(message.guild) }] })
        if (['global', 'todos', 'all'].includes(args)) return message.reply({ embeds: [{ description: await generateGlobal(client)}] })
        if (['eu', 'pessoal'].includes(args) || client.users.cache.get(args)) return message.reply({ embeds: [{ description: await generateUsers(client.users.cache.get(args) || message.author)}] })
        
        const a = data.prefix + 'rank'
        message.reply({ embeds: [{ description: `**Uso do comando**:\n\n\`${a} global\` => Mostra o rank global\n\`${a} local\` => Mostra o rank do servidor\n\`${a} pessoal\` => Mostra o seu rank\n\`${a} id\` => Mostra o rank de outra pessoa\n\n**Dica:** Você pode fazer o ReactLogger mandar o rank em um canal a cada 10 minutos com \`${data.prefix}setrank\`` }]})
        
    }
}