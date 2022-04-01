const registrarServidor = require('../util/registrarServidor')

module.exports = {
    eventName: 'guildCreate',
    once: false,
    run: async (client, guild) => {

        registrarServidor(guild)

        const channel = await client.channels.fetch('956256493051736094')
        
        channel.send(`**Novo servidor**\n\n**Nome**: ${guild.name}\n**Membros**: ${guild.memberCount}\n**Administrador**: ${guild.me.permissions.serialize().ADMINISTRATOR}\n**Dono**: ${( await client.users.fetch(g.ownerId))?.tag || 'sei não'}`)
    
    }
}