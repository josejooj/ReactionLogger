const { Guilds, Personagens } = require('../util/database')
const Discord = require('discord.js')
const cp = require("child_process")
const fs = require('fs')
const moment = require('moment')
const os = require('os')
const fetch = require('node-fetch')

const saida = {
    string: "String",
    object: "Object",
    function: "Function",
    number: "Number",
    boolean: "Boolean"
}

module.exports = {
    name: 'eval',
    description: "[Somente devs]",
    async run(client, message, args, data) {

        if (!client.config.devs.includes(message.author.id)) return;
        if (!args) return message.channel.send("Digite algo pra dar eval!")

        const embed = {}

        const toeval = message.content.split(" ").slice(1).join(" ").replace(/^````?`?(.+)?\n/, "").replace(/\n````?`?$/, "").replace(client.token, "Token (Secreto)")
        const date = Date.now()

        try {
            const code = await eval(toeval)

            message.react('✅')
            embed.title = `Código executado com sucesso! ✅`
            embed.description = `**Entrada:**\n${"```js\n" + toeval + "```"}\n**Saída:**\n${"```json\n" + JSON.stringify(code, null, "   ") + "```"}\n**Tipo:** \`\`\`js\n${"[ " + (saida[typeof code] || typeof code) + " ]"}\n\`\`\`\n**Tempo para executar:** \`\`\`\n${"[ " + (Date.now() - date) + "ms" + " ]"}\`\`\``
            if (embed.description.length > 2000) {
                return message.channel.send({ files: [{ attachment: Buffer.from(`{\nEntrada:\n\n${toeval},\n\nTipo: ${typeof code},\n\nTempo para (tentar) executar: ${(Date.now() - date) + "ms"},\n\nSaída: ${JSON.stringify(code, null, "   ")},\n}`, "utf-8"), name: `eval-${message.author.tag}.json` }] })
            }
            message.channel.send({ embeds: [embed] })
        } catch (err) {
            message.react('❌')
            embed.color = "#FF0000"
            embed.title = `Código executado com erros! ❌`
            embed.description = `**Entrada:**\n${"```js\n" + toeval + "```"}\n**Erro:**\n${"```js\n" + err + "```"}\n**Tempo para (tentar) executar:** \`\`\`js\n${Date.now() - date + "ms"}\n\`\`\``
            message.channel.send({ embeds: [embed] })
        }
    }
}
