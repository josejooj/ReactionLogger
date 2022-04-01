module.exports = {
    name: 'ping',
    description: "Comando para ver a latência entre você e o BOT",
    run: (client, message, args, data) => {
        
        const ping = Date.now() - message.createdTimestamp
        message.reply(`Pong! Ping de ${ping}ms\n`)

    }
}