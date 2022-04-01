const { Collection } = require('discord.js')
const moment = require('moment')

moment.locale('pt-BR')

class TimerManager extends Collection {
    constructor() 
    {
        super();
    }

    getItem(guildId) 
    {
        const guild = this.get(guildId);
        if (!guild) this.set(guildId, { date: 0, str: '' });
        return this.get(guildId);
    }

    setItem(guildId, string) 
    {
        this.set(guildId, { date: Date.now(), value: string + `\n\nLOG gerado em ${moment().format("LLLL:ss")}` });
        return string;
    }
}

module.exports = TimerManager;