const registrarServidor = require('../util/registrarServidor');

module.exports = {
    eventName: "messageCreate",
    once: false,
    run: async (client, message) => {
        
        if (message.author.bot || message.channel.type == 'dm' || !message.member?.permissions.has('ADMINISTRATOR') || client.config.beta && !client.config.devs.includes(message.author.id)) return;
        
        const data = await registrarServidor(message.guild)
        const commandName = message.content.split(' ')[0].slice(data.prefix.length).toLowerCase()
        const args = message.content.split(" ").slice(1).join(" ").replace(/\\+(.|\n)/gmi, "$1").replace(/`/g, '\\`').replace(/(<@(!|&)?\d+>|@(everyone|here))/img, "`$1`")

        const command = client.commands.find(x => x.name == commandName || x.aliases?.includes(commandName))
        
        if (!message.content.startsWith(data.prefix)) return
        if (!command) return message.react('❓');
        
        command.run(client, message, args, data)
    }
}