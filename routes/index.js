const router = require("express").Router();
const Discord = require("discord.js");
const client = require("../server.js");

/* ----------=> Databases - Coffee Cups <=----------*/

const Bots = require("../Clusters/Models/Bots.js");
const User = require("../Clusters/Models/User.js");
const Analises = require("../Clusters/Models/Analises.js");

/* ----------=> Databases - Coffee Cups <=----------*/

/* ----------=> Livrarias - Coffee Cups <=----------*/

let livrarias = [
  "discordcr",
  "Nyxx",
  "Discord.Net",
  "discord.py",
  "discord.js",
  "DiscordGo",
  "Discord4J",
  "disco",
  "Nyxx",
  "DSharpPlus",
  "Eris",
  "Discordia",
  "RestCord",
  "DBM",
  "JDA",
  "JavaCord",
  "serenity",
  "Sword",
  "SwiftDiscord",
  "Outro"
];

/* ----------=> Livrarias - Coffee Cups <=----------*/

router.get("/", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");
  let filter = {};
  let allBots = await Bots.find(filter)
  
     await User.findOne({ _id: usera.id }, async (err, dados) => { if (dados) { client.users.fetch(usera.id).then(usuario => { console.log(dados) });  } else { 
        
        new User({
            _id: usera.id
        }).save()
       
       console.log(`Usuário ${usera.username} registrado na database com sucesso !`)
       
       let embed = new Discord.MessageEmbed().setDescription(`Usuário ${usera.username} registrado na database com sucesso !`).setColor("RANDOM")
       
       client.channels.cache.get('758009666943844412').send(embed)
      }
      
    }).catch(err => {
      
      res.redirect("/");
      
    });

    setTimeout(() => {
        client.users.fetch(usera.id).then(userinfo => { res.render("index.ejs", { user: req.session.user || null, Bots: allBots, client, userinfo }) });
    }, 2000)
});

router.get("/analises", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");

  if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')
  
  let filter = {};
  let Analise = await Analises.find(filter);
  
    setTimeout(() => {

          res.render("analises.ejs", { user: req.session.user, Analise, client });
    
    }, 2000)
});

router.get("/sobre", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");

  if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')
  
  let filter = {};
  let Analise = await Analises.find(filter);
  
    setTimeout(() => {

          res.render("sobre.ejs", { user: req.session.user, Analise, client });
    
    }, 2000)
});

router.get("/status", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");

  //if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')
  
  let filter = {};
  let Analise = await Analises.find(filter);
  
    setTimeout(() => {

          res.render("status.ejs", { user: req.session.user, Analise, client });
    
    }, 2000)
});

router.get("/bots/:id", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");
  let id = req.params.id
  //if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')
  
  let filter = {};
  await Bots.findOne({ _id: id }, async(err, dados) => {             
  
    setTimeout(() => {

          res.render("bots.ejs", { user: req.session.user, dados, client });
    
    }, 2000)
    
    })
});

router.get("/Analisar/:id", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");
    
  if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')
  
  const id = req.params.id;
  
  client.users.fetch(id).then(async botinfo => {
    
    await Analises.findOne({ _id: id }, async (err, dados) => {
      
      if (dados) { client.users.fetch(usera.id).then(usuario => { client.users.fetch(dados.owner).then(async criador => { res.render("analisar.ejs", { user: req.session.user, client, userinfo: usuario, dados, id, bot: botinfo, criador }); }); });
        
      } else {
        
        console.log("bot nao encontrado");

      }
      
    }).catch(err => {
      
      res.redirect("/");
      
    });
  });
});

router.get("/Aprovar/:id", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");

  if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has(('756903242071277678'))) return res.send('Acesso Negado !')

  const id = req.params.id
  
  client.users.fetch(id).then(async botinfo => {
    
    await Analises.findOne({ _id: id }, async (err, dados) => {
      
      new Bots({
          _id: id,
          name: dados.name,
          prefix: dados.prefix,
          invite: dados.invite,
          suporte: dados.suporte,
          owner: dados.owner,
          shortdescription: dados.shortdescription,
          description: dados.description,
          avatar: dados.avatar,
          livraria: dados.livraria
      }).save()
              
await User.findByIdAndUpdate(dados.owner, { $push: { bots: id } })
      
      
                          let embed = new Discord.MessageEmbed()
                          .setThumbnail(dados.avatar)
                          .setTitle(`🔎 | ANÁLISE`)
                          .setColor('2f3136')
                          .addField(`🤖 | **Bot**`, `<@${dados._id}>`)
                          .addField(`👨‍🔄1�7 | **Criador**`, `<@${dados.owner}>`)
                          .addField(`📜 | **Resultado**`, 'Aprovado')
                          .setFooter(`Análise realizada por: ${usera.tag}`)

                        let embedabc1 = new Discord.MessageEmbed()
                        
                        .setDescription(`Bot <@!${id}> do usuário <@!${dados.owner}> foi aprovado !`)
                        .setColor("RANDOM")
                            client.channels.cache.get('756902109718380674').send('<@!'+dados.owner+'>', embedabc1)

       
      new Analises({
          _id: id,
          name: dados.name,
          prefix: dados.prefix,
          invite: dados.invite,
          suporte: dados.suporte,
          owner: dados.owner,
          shortdescription: dados.shortdescription,
          description: dados.description,
          avatar: dados.avatar,
          livraria: dados.livraria
      }).delete()
      
      await User.findOne({ _id: dados.owner }, async (erro, dadosss) => {
          
          if (dadosss) {
          
                        let embedabcde = new Discord.MessageEmbed()
                        
                        .setDescription(`<@${dados.owner}> \n ${dadosss}`)
                        .setColor("RANDOM")
                        
        client.channels.cache.get('756902109718380674').send(embedabcde)
                        
      }
      })
      
      if (dados) { client.users.fetch(usera.id).then(usuario => { client.users.cache.get(dados.owner).send(embed), client.channels.cache.get('758028350999494790').send(embedabc1), client.guilds.cache.get('756899938683715785').members.cache.get(id).roles.add('756903601632182296'), client.guilds.cache.get('758028350999494790').members.cache.get(id).roles.remove('757765230897004624'), res.send('Bot aprovado com sucesso !') });
        
      } else {
        
        console.log("bot nao encontrado");

      }
      
    }).catch(err => {
      
      res.redirect("/");
      
    });
  });
});

router.get("/Reprovar/:id", async (req, res) => {
  
  let usera = req.session.user;
  if (!usera) return res.redirect("/authorize");
   
  if(!client.guilds.cache.get('756899938683715785').members.cache.get(usera.id).roles.cache.has('756903242071277678')) return res.send('Acesso Negado !')
  
  const id = req.params.id
  
  client.users.fetch(id).then(async botinfo => {
    
    await Analises.findOne({ _id: id }, async (err, dados) => {
      
                          let embed = new Discord.MessageEmbed()
                          .setThumbnail(dados.avatar)
                          .setTitle(`🔎 | ANÁLISE`)
                          .setColor('2f3136')
                          .addField(`🤖 | **Bot**`, `<@${dados._id}>`)
                          .addField(`👨‍🔄1�7 | **Criador**`, `<@${dados.owner}>`)
                          .addField(`📜 | **Resultado**`, 'Reprovado')
                          .setFooter(`Análise realizada por: ${usera.tag}`)
                          
                        let embedabc2 = new Discord.MessageEmbed()
                        
                        .setDescription(`Bot <@!${id}> do usuário <@!${dados.owner}> foi reprovado !`)
                        .setColor("RANDOM")
                     client.channels.cache.get("756902109718380674").send('<@!'+dados.owner+'>', embedabc2)      
                          
      new Analises({
          _id: id,
          name: dados.name,
          prefix: dados.prefix,
          invite: dados.invite,
          suporte: dados.suporte,
          owner: dados.owner,
          shortdescription: dados.shortdescription,
          description: dados.description,
          avatar: dados.avatar,
          livraria: dados.livraria
      }).delete()
      
      if (dados) { client.users.fetch(usera.id).then(usuario => { client.users.cache.get(dados.owner).send(embed), client.channels.cache.get('758028350999494790').send(embedabc2), client.guilds.cache.get('756899938683715785').members.cache.get(id).kick(), res.redirect('/') });
        
      } else {
        
        console.log("bot nao encontrado");

      }
      
    }).catch(err => {
      
      res.redirect("/");
      
    });
  });
});

router.post("/send", async (req, res) => {
  
  let usera = req.session.user
  if (!usera) return res.redirect("/authorize");
    
  client.users.fetch(req.body.botID).then(bot => {
  
  
  new Analises({
    
          _id: bot.id,
          name: bot.username,
          prefix: req.body.botPrefix,
          invite: req.body.botInvite,
          suporte: req.body.botSuporte,
          owner: usera.id,
          shortdescription: req.body.botDescP,
          description: req.body.botDescG,
          avatar: bot.displayAvatarURL({ size: 2048 }),
          livraria: req.body.livraria
    
  }).save()
    
  let embed = new Discord.MessageEmbed()
  
  .setDescription(`Olá <@!${usera.id}> seu bot ${bot.tag} foi enviado para análise !`)
  
   let embedabc3 = new Discord.MessageEmbed()
  
  .setDescription(`<:BOT:756907594865573910> <@!${usera.id}> Adicionou ${bot.tag} para análise !`)
  .setColor("RANDOM")
                      client.channels.cache.get("756902109718380674").send('<@!'+usera.id+'>', embedabc3)  
  
  return client.users.cache.get(usera.id).send(embed), res.send('Seu bot foi enviado para verificação com sucesso !')
  
  })  
})

router.get('/addbot', (req, res) => {
  
  let usera = req.session.user
  if(!usera) return res.redirect('/authorize')
  
        res.render('addbot.ejs', { client, livrarias, user: req.session.user || null });
  
});

router.get('/perfil/bots', async (req, res) => {
  
  let usera = req.session.user
  if(!usera) return res.redirect('/authorize')  
  let bots_perfil = []
  
      await User.findOne({ _id: usera.id }, async (err, dados) => {
          
          
      if (dados) { client.users.fetch(usera.id).then(usuario => {
          
          for(let i = 0; i < dados.bots.length; i++) { 
              
                Bots.findOne({ _id: dados.bots[i] }, async (erro, infos) => {
                    
                    bots_perfil.push(infos)
                    
                })
                
          }

          setTimeout(() => {
              
                              console.log(dados), console.log(bots_perfil), res.render('perfil_bots.ejs', { userinfo: usuario, bots_perfil, client, user: req.session.user || null });
                              
          }, 4000)
          
      });
          
      }
      
    }).catch(err => {
      
      res.redirect("/");
      
    });
  
});

router.get('/perfil', async (req, res) => {
    
  let usera = req.session.user
  if(!usera) return res.redirect('/authorize')  
   client.users.fetch(usera.id).then(usuario => { res.render('perfil.ejs', { userinfo: usuario, client, user: req.session.user || null }); });
  
})

router.get('/perfil/storage', async (req, res) => {
    
  let usera = req.session.user
  if(!usera) return res.redirect('/authorize')  
   await User.findOne({ _id: usera.id }, async (err, dados) => { client.users.fetch(usera.id).then(usuario => { res.render('add-imagem.ejs', { userinfo: usuario, client, storage: dados.storage, user: req.session.user || null }) }) })
  
})

router.post('/perfil/storage/save', async (req, res) => {
    
  let usera = req.session.user
  if(!usera) return res.redirect('/authorize')
  var imgur = require("imgur")
      imgur.setAPIUrl('https://api.imgur.com/3/');
      imgur.getAPIUrl();
      
      console.log(req.body.file)
})

    // IMPORTAMOS NOSSO MIDDLEWARE

    // ROTA PARA GET, RENDERIZAR O FORMULÁRIO
router.get('/nova-imagem', (req, res, next) => {
        res.send(`
            <html>
                <head> 
                    <title> Nova imagem </title>
                </head>
                </body>
                    <!-- O enctype é de extrema importância! Não funciona sem! -->
                    <form action="/nova-imagem"  method="POST" enctype="multipart/form-data">
                        <!-- O NAME do input deve ser exatamente igual ao especificado na rota -->
                        <input type="file" name="image">
                        <button type="submit"> Enviar </button>
                    </form>
                </body>
            </html>
        `);
    });

module.exports = router;