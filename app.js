const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module

const morgan = require('morgan') //Import du middleWare morgan
const favicon = require('serve-favicon') //Import du middleWare serve-favicon
const bodyParser = require('body-parser') //Import du middleWare body-parser

//const helper = require('helper.js') //import du module helper
const { success, getUniqueId } = require('./helper.js') //desctruturat°

let pokemons = require('./mock-pokemon'); //import list pokemons, puis pt de terminaison...
  
const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = 5001 // port sur lequel on va demarrer notre APIREST pr la suite

//MiddleWare logger
/*const logger =(req,res, next) => { //3param
    console.log(`URL : ${req.url}`);
    next() //METHOD next fournit pr express indiquant que le traitemnt du MiddleWare est terminée
}

app.use(logger)*/

//on abrege le code pour qu'il soit plus concis...
/*app.use ((req,res, next) => { //3param
    console.log(`URL : ${req.url}`);
    next() //METHOD next fournit pr express indiquant que le traitemnt du MiddleWare est terminée
})*/

//app.use (morgan('dev')) // Utilisat° de cette dependance ds mn code (phase de dev & debug)
//METHOD 'use' pr attacher un middleWare à notre API REST avc express
//npm install morgan --save-dev
//npm install serve-favicon --save puis import du fichier favicon.ico


//Utilisation de favicon + morgan + bodyParser
app
  .use(favicon(__dirname + '/favicon.ico')) 
  .use(morgan('dev'))
  .use(bodyParser.json()) 
  //sr ts ls pts de terminaison, on parse ttes les inputdata vers notre APIREST
 
app.get('/', (req, res) => res.send('Hello, Express 👋!'))
//Notre 1er poitn de terminaison definit
//METHOD de la req GET qui va prendre en param 2 elements...

/*app.get('/api/pokemons/:id/:name', (req, res) => {
    const id = req.params.id //recupere l'id ds l'url & send la res au client
    const name = req.params.name
    res.send(`Le pokemon n°${id} est ${name}`)
})*/

/*app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) //recupere l'id ds l'url & send la res au client
    const pokemon = pokemons.find(pokemon => pokemon.id === id) //METHOD find pr recup un pokemon
    res.send(`Vous avez demandé Le pokemon ${pokemon.name}`)
  })*/

/*app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) //recupere l'id ds l'url & send la res au client
    const pokemon = pokemons.find(pokemon => pokemon.id === id) //METHOD find pr recup un pokemon
    res.json(pokemon)
})*/

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) //recupere l'id ds l'url & send la res au client
    const pokemon = pokemons.find(pokemon => pokemon.id === id) //METHOD find pr recup un pokemon
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message,pokemon)) //METHOD success pr avoir une res structurée
})

//Le nouveau pt de terminaison qui affiche le nbr total de pokemons
/*app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})*/

// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons)) 
  })

//Ajout d'un POKEMON
app.post('/api/pokemons', (req, res) => { //action POST + url associé st def...
    const id = getUniqueId(pokemons) //...
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//fusion les data du pokemon recu via la req hhtp entrante avc l'id unique généré
    pokemons.push(pokemonCreated) //ajout d'un pok a la liste des poks existants ..
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
//on genere un msg de confirmat° ds consommat de l'API REST
    res.json(success(message, pokemonCreated)) //retourne l'enssembl ds un JSON
})

//Modifier un pokemon (en passant pr notre APIREST)
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
//Modife du POKEMON, MAJ de la liste global de pok,l'ancien remplacé pr le new
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    }) //list des pk a jour (demander pr le client)
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });

//Suppression d'un pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)//
//METHOD FIND renvoi la valeur du 1er elemnt trouvé
    pokemons = pokemons.filter(pokemon => pokemon.id !== id) //METHOD JS ative 'filter'
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  }); // on obtient en retour une nouvelle liste de pokemon avc le pok suppr

app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
//METHOD listen fournit pr express