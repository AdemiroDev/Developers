const Discord = require("discord.js");
const { Structures } = require('discord.js');
const User = require ('../Clusters/Models/User.js')

const client = new Discord.Client();


client.login('NzU2OTAyMzY0MTQ0ODYxMjE0.X2YmQg.4BDLDcT4RGQzWaU32B90-7pDWtY')

const config = require("../config.json");
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");
var userTickets = new Map()

client.on("ready", async () => {
    
    /*let embed = new Discord.MessageEmbed()
    
    .setTitle("<a:Setinha:744250893947502633> | Verificação - Captcha")
    .setDescription("<a:Verificado:744250862678835250> | Olá, para você se auto-verificar em nosso servidor, você precisa clicar na reação <a:Dancinha:744254721019346995>, assim você irá receber o cargo de Membro em nosso servidor e terá acesso aos outros canais, desbloqueando o servidor por completo para si mesmo")
    
    let canal = client.channels.cache.get("751427800207982592")
    canal.send(embed)*/

});

  client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    
    var comando = message.content.toLowerCase().split(" ")[0];
    comando = comando.slice(config.prefix.length);

    var args = message.content.split(" ").slice(1);
    try {
        var arquivoComando = require(`./commands/${comando}.js`)
        arquivoComando.run(client, message, args);
    } catch (erro) {
        if (erro.code == "MODULE_NOT_FOUND") return;
        console.log(erro);
    }

});

client.on('raw', async dados => {
  
    if(dados.t !== "MESSAGE_REACTION_ADD") return
    if(dados.d.message_id != "751429185540587581") return

    let servidor = client.guilds.cache.get("720775970080030781")
    let membro = servidor.members.cache.get(dados.d.user_id)

    if(dados.t === "MESSAGE_REACTION_ADD"){
        if(dados.d.emoji.id === "744254721019346995"){

        const embed = new Discord.MessageEmbed()
        .setTitle('**|** Agradecimentos')
        .setDescription('**|** Obrigado por se verificar em nosso servidor !')
        
    client.users.cache.get(dados.d.user_id).send(embed)
            
    servidor.members.cache.get(dados.d.user_id).roles.add('751427733904556032')
    servidor.members.cache.get(dados.d.user_id).roles.remove('751427734458204161')
}
}
})


client.on('guildMemberAdd', async (member) => {

    let servidor = client.guilds.cache.get("720775970080030781")
    
    if(member.user.bot === true) {
        
        const embedwel = new Discord.MessageEmbed()
        
        .setTitle('**|** Coffe Cups - Welcome')
        .setDescription(`**|** Olá ${member.user.tag} esperamos que execute muitos comandos na \` Coffe Cups \` !`)
        .setFooter(`Bots atuais: ${servidor.members.cache.filter(a => a.user.bot).size}`)
        
    return client.channels.cache.get('756900872914731198').send(embedwel)

    } else {
        
        const embed = new Discord.MessageEmbed()
        
        .setTitle('**|** Coffe Cups - Agradecimentos')
        .setDescription('**|** Obrigado por entrar na \` Coffe Cups \` !')
        .addField(`**|** Nosso WebSite`, `[ Coffe Cups - WebSite](https://coffecups.glitch.me/)`)
        
        const embedwel = new Discord.MessageEmbed()
        
        .setTitle('**|** Coffe Cups - Welcome')
        .setDescription(`**|** ${member.user.tag} Obrigado por entrar na \` Coffe Cups \` !`)
        .addField(`**|** Nosso WebSite`, `[ Coffe Cups - WebSite](https://coffecups.glitch.me/)`)
        
    return client.users.cache.get(member.user.id).send(embed), client.channels.cache.get('756900872914731198').send(embedwel)
        
    }

})

client.on('message', async (message) => {

var imgur = require("imgur")
imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getAPIUrl();

    if(message.channel.id === '752663105825144873') {
        
		if(message.attachments.first().url.endsWith('png') || message.attachments.first().url.endsWith('jpg') || message.attachments.first().url.endsWith('gif')) {
			imgur.uploadUrl(message.attachments.first().url).then(function (json) {

                                         const setpush = async () => {
                                             
                                            const b = await User.findByIdAndUpdate(message.author.id, { $push: { storage: json.data.link } })
                                            
                                        }
                                        setpush()

			    message.delete()
			    message.author.send('A imagem foi salva na minha database:\n' + json.data.link)
message.channel.send('Enviei em seu privado !').then(a => {
				    setTimeout(() => {
				        a.delete()
				    }, 2000)
				})
			}).catch(function (err) {
				message.channel.send('Aconteceu um erro, tente novamente.').then(a => {
				    setTimeout(() => { a.delete() }, 2000)
				})
			})
		} else {
			message.channel.send('Só são suportados arquivos png, jpg e gif.').then(a => {
				    setTimeout(() => {
				        a.delete()
				    }, 2000)

})
		}
	}

})
client.on('ready', async () => {
  
    console.log('Bot iniciado com sucesso !')

})