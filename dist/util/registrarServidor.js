const { Guilds } = require('./database')

module.exports = async (guild, force) => {

    let data = await Guilds.findOne({ _id: guild.id })
    
    if (!data || data && force) {
        data = await new Guilds({
            _id: guild.id,
            canais: {
                channelList: []
            }
        }).save()
    }

    data.prefix = data.prefix || guild.client.config.prefix

    return data;
}