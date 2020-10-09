const express = require('express');
const Database = require('./Clusters/Cluster-01.js')
const app = express()
const http = require('http').Server(app);
const session = require('express-session');
const port = 3000
const Discord = require("discord.js");
const client = new Discord.Client();

require('./Bot/index.js')

client.login('NzU2OTAyMzY0MTQ0ODYxMjE0.X2YmQg.4BDLDcT4RGQzWaU32B90-7pDWtY')

client.on('ready', async () => {

  console.log('Loguei com sucesso na API Discord.JS !')
  
})

//pronto logou 

module.exports = ('client', client)

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(session({ secret: '48738924783748273742398747238', resave: false, saveUninitialized: false, expires: 604800000 }));

require('./router.js')(app);

const listener = app.listen(port, () => {
  console.log(`Site rodando na porta : ` + listener.address().port);
});