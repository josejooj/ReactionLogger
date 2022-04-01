const config = require('../config.json')
const { guilds, personagens } = require('./schemas')
const mongoose = require('mongoose');

(async () => {
    const connectionString = config.mongoPass + (config.beta? '/beta':'/stable') + '?retryWrites=true&w=majority'
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`\x1b[32m[MongoDB] - Estou logado na Collection ${config.beta? 'beta':'stable'}\x1b[0m`)
    } catch(e) {
        console.error(`\x1b[31m[MongoDB] - Não foi possível me conectar ao banco de dados devido a um erro: \x1b[0m` + e.stack)
        process.exit()
    }
})()

const Guilds =      mongoose.model('guilds',       new mongoose.Schema(guilds)     )
const Personagens = mongoose.model('reacts',       new mongoose.Schema(personagens))

module.exports = {
    Guilds,
    Personagens
}