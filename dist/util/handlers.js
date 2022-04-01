const fs = require('fs')

module.exports = {
    registrarComandos: () => {
        
        const commands = []
        
        for (const x of fs.readdirSync('./commands')) {
            const command = require(`../commands/${x}`)
            commands.push(command)
        }

        return commands;
    },
    registrarEventos: (client) => {
        
        for (const x of fs.readdirSync('./events')) {
            const event = require(`../events/${x}`)
            client[event.once? 'once':'on'](event.eventName, event.run.bind(null, client))
        }

    }
}