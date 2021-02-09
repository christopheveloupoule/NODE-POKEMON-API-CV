const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module

//const morgan = require('morgan') //Import du middleWare morgan (details de msg de log que l'on souhaite affiché)
const favicon = require('serve-favicon') //Import du middleWare serve-favicon
const bodyParser = require('body-parser') //Import du middleWare body-parser data JSON
const sequelize = require('./src/db/sequelize') //on le recupe en passant pr notre module sequelize
const cors = require('cors')

const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = process.env.PORT || 5001 // On doit prendre en compte la variable d'env PORT en Prod et 5001 en local

//Utilisation de favicon + morgan + bodyParser
//Methode app.use pr utiliser le nouveau middleware (favicon) puis le morgan le LOGG et le bodyParser
app
  .use(favicon(__dirname + '/favicon.ico'))
  //.use(morgan('dev'))
  .use(bodyParser.json())  // on parse ttes les données entrantes vers notre APIREST
  .use(cors())

sequelize.initDb() //On appelle la METHOD initDb appelé precedemmnt

app.get('/', (req,res) => { //End point en sur la plateforme Heroku
  res.json('Hello, Heroku !')
})
 
//Ici ns placerons ns futurs pts de terminaison

//traitement de la route dans le module concerné (findAllPokemons)
//equivalent à 
//const findAllPokemons = require('./src/routes/findAllPokemons')
//findAllPokemons(app)
require('./src/routes/findAllPokemons')(app) 
require('./src/routes/findPokemonByPk')(app) 
require('./src/routes/createPokemon')(app) 
require('./src/routes/updatePokemon')(app) 
require('./src/routes/deletePokemon')(app) 
require('./src/routes/login')(app) //pt de terminaison d'authent ok...

//Ajout de la gestion des err 404(fct de middleware):
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
	res.status(404).json({message});
});
/*Utilisation de la METHOD STATUT d'express pr def un statut à notre res, 
cette METHOD prend en param, le code de statut HTTP à retourner à ns clients*/

//METHOD listen fournit pr express
app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
