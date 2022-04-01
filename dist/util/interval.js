const { Guilds } = require('./database')
const { generateServer, generateGlobal } = require('./rank')

module.exports = async (client) => {
    const database = await Guilds.find({ ['canais.rank']: { $exists: true } })
    
    for (const x of database) {
        const canal = await client.channels.fetch(x.canais.rank)
        const guild = await client.guilds.fetch(x._id)
        if (canal && guild) {
            const local = await generateServer(guild)
            const global = await generateGlobal(client)
            canal.send({ embeds: [{ description: local }] })
            canal.send({ embeds: [{ description: global }] })
        }
    }
}