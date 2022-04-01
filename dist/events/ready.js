const interval = require('../util/interval')

module.exports = {
    eventName: 'ready',
    once: true,
    run: (client) => {
        console.log(`\x1b[32m[INFO] = Estou online como ${client.user.tag}\x1b[0m`)
        if (client.config.beta) interval(client);
        setInterval(interval.bind(client), 1000 * 60 * 10)

        process.on('warning', async (warn) => {
            if (/UnhandledPromiseRejectionWarning: /gmi.test(warn.stack)) {
                const channel = await client.channels.fetch(client.config.canallog.warn);
                channel.send(`**${moment().format('LLLL')}${"```js\n" + `${warn.stack}` + "```"}**`);
            }
        })

        process.on('unhandledRejection', async rejection => {
            const channel = await client.channels.fetch(client.config.canallog.rejection);
            channel.send(`**${moment().format('LLLL')}${"```js\n" + `${rejection.stack}` + "```"}**`);
        })
    }
}