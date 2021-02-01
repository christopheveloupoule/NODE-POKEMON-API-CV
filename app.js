const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module

const morgan = require('morgan') //Import du middleWare morgan
const favicon = require('serve-favicon') //Import du middleWare serve-favicon
const bodyParser = require('body-parser') //Import du middleWare body-parser
const sequelize = require('./src/db/sequelize') //on le recupe en passant pr notre module sequelize

const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = 5001 // port sur lequel on va demarrer notre APIREST pr la suite

//Utilisation de favicon + morgan + bodyParser
app
  .use(favicon(__dirname + '/favicon.ico')) 
  .use(morgan('dev'))
  .use(bodyParser.json()) 
  //sr ts ls pts de terminaison, on parse ttes les inputdata vers notre APIREST

sequelize.initDb()
 
//Ici ns placerons ns futurs pts de terminaison

require('./src/routes/findAllPokemons')(app) 
//traitement de la route dans le module concerné (findAllPokemons)
//equivalent à 
//const findAllPokemons = require('./src/routes/findAllPokemons')
//findAllPokemons(app)

app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
//METHOD listen fournit pr express