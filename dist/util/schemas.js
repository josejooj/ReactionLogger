module.exports = {
    guilds: {
        _id:             String, // ID do servidor
        prefix:          String, // Prefixo do servidor
        canais: {
            log:         String, // Canal de LOGs, pra onde vai os LOGs
            rank:        String, // Canal de Ranks, pra onde vão os ranks
            commands:    String, // Canal de comandos, onde as pessoas vão fazer comandos
            channelList: Array   // Array de strings, com o id dos canais
        },
        /*rank: {
            canal: String,       // Canal de Ranks, pra onde vão os ranks
            type: Number
        }*/
    },
    personagens: {
        _id:           Number,  // Data que a pessoa reagiu
        name:          String,  // Nome do personagem
        from:          String,  // Origem do personagem
        time:          Number,  // O tempo pra reagir
        mr:            Boolean, // Mudae reagiu?
        ids: {
            user:      String,  // ID do usuário
            guild:     String,  // ID do servidor 
            channel:   String,  // ID do canal da mensagem do Mudae
            msg:       String   // ID da mensagem do Mudae
        }
    }
}
