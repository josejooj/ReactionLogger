const { registrarComandos, registrarEventos } = require('./util/handlers')
const discord = require('discord.js')
const client = new discord.Client({ intents: 1537, partials: ['REACTION', 'MESSAGE'] })

client.config = require('./config.json')
client.commands = registrarComandos()

registrarEventos(client)

client.login(client.config.token)

if (client.config.beta) client.config.prefix = 'b.'