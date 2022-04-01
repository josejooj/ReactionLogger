module.exports = {
    name: 'help',
    description: "Comando que mostra todos os comandos",
    run: (client, message, args, data) => {
        
        let str = `**Comandos do ${client.user.username}**\nTotal: ${client.commands.length}\n`
        let i = 0;

        for ( const x of client.commands ) {
            str += `\n[\`${++i}\`] - \`${data.prefix + x.name}\` - ${x.description}`
        }

        str += `\n\n**Gostou de mim? [Me convide para o seu servidor](https://discord.com/api/oauth2/authorize?client_id=944408474614394880&permissions=8&scope=bot%20applications.commands)**`
    
        message.reply({ embeds: [{ description: str }]})
    }
}