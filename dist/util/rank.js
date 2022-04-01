const { Personagens } = require('./database')
const TimerManager = require('./TimerManager')
const formatTime = require('../util/formatTime');

const Timers = new TimerManager();
const tempo_ms = 60000

module.exports = {
    generateServer: async (guild) => {
        
        const timer = Timers.getItem(guild.id)

        if ((Date.now() - timer.date) < tempo_ms) return timer.value;

        let i = 0, str = `**Ranking dos player's com o melhor tempo do servidor "${guild.name}"**\n`
        const data = (await Personagens.find({ ['ids.guild']: guild.id })).sort((x, y) => x.time - y.time).slice(0, 50)
        
        if (data.length != 0) data.map(x => str += `\n[\`${++i > 9 ? i : '0' + i}\`] - <@${x.ids.user}> - \`${formatTime(x.time)}\``)
        else str += `\nNenhum LOG nesse servidor :(\nPara setar os canais onde o BOT pode atuar use o comando \`channellist\``

        return Timers.setItem(guild.id, str);
    },
    generateGlobal: async(client) => {
        const timer = Timers.getItem('global')

        if ((Date.now() - timer.date) < tempo_ms) return timer.value;

        let i = 0, str = `**Ranking global dos jogadores com melhor tempo do Mudae**\n`; 
        
        for (const x of (await Personagens.find({ time: { $lt: 510 }})).sort((x, y) => x.time - y.time).slice(0, 50)) {
            const user = await client.users.fetch(x.ids.user); 
            x? str += `\n[**\`${++i > 9 ? i : '0' + i}\`**] - ${`\`${user.tag}\``} - \`${formatTime(x.time)}\``:''
        }

        return Timers.setItem('global', str);
    },
    generateUsers: async(user) => {
        const timer = Timers.getItem(user.id)

        if ((Date.now() - timer.date) < tempo_ms) return timer.value;

        let i = 0, str = `**Ranking de tempo do jogador ${user.tag}**\n`, data = (await Personagens.find({ ['ids.user']: user.id })).sort((x, y) => x.time - y.time).slice(0, 50)
        
        if (data.length != 0) data.map(x =>  str += `\n[**\`${++i > 9 ? i : '0' + i}\`**] - \`${user.tag}\` - \`${formatTime(x.time)}\``)
        else str += "\nLOL, parece que esse usuário não tem nenhum LOG..."

        return Timers.setItem(user.id, str);
    }
}