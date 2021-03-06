
/*Prendre en compte
const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module

const morgan = require('morgan') //Import du middleWare morgan (details de msg de log que l'on souhaite affiché)
const favicon = require('serve-favicon') //Import du middleWare serve-favicon
const bodyParser = require('body-parser') //Import du middleWare body-parser (data JSON)
const { Sequelize, DataTypes } = require('sequelize') //Type de donnee contenu ds notre model

//const helper = require('helper.js') //import du module helper
const { success, getUniqueId } = require('./helper.js') //desctruturat° (dans le helpers.js)

let pokemons = require('./src/db/mock-pokemon'); //import list pokemons, puis pt de terminaison...
const PokemonModel = require('./src/models/pokemon') //Import de notre modèl


const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = 5001 // port sur lequel on va demarrer notre APIREST pr la suite
*/
////////////////////////////////////JUST HELP COMMENT a

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

////////////////////////////////////////JUST HELP COMMENT a


//Creer & configurer une instance de la classe "sequelize"
//Connexion à la DB, on s'en sert pr la suite ds notre code
//4param passé au construct de sequelize
/*Prendre en compte
const sequelize = new Sequelize('pokedex', 'root', '', { //DB+id+PWD
    host: 'localhost', // ou se trouve la DB sr notre machine
    dialect: 'mariadb', //Nm du DRIVER pr permettre à Sequelize d'interag avc notre DB
    dialectOptions: {
      timezone: 'Etc/GMT-2', 
    },
    logging: false
  }
)*/

//timezone & logging : evite ls affichages d'avertissemnt ds la console plusu tard

//Test si la connexion a réussi ou non
/*Prendre en compte
sequelize.authenticate()
  .then(_ => console.log('La connexion a la base de données a bien été établie.'))
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

const Pokemon = PokemonModel(sequelize, DataTypes)  
//On instancie notre model PokemonModel, cree la table POKEMON associé a ce model

//On synchronise notre demande avec l'etat de la DB 
//sync permet de supprim la table associée a chaque model avant d'effectuer un synchr
sequelize.sync({force: true})
 .then(_ => {
    console.log('La base de donnée "Pokedex" a bien été synchronisée.')*/

    /////////////////////////////////////////////////////////////////////////

//Permet de pousser les datas ds 12pokemons de depart directement 
//en DB lors du demarrage de notre APIREST
/*Prendre en compte
    pokemons.map(pokemon => { //permet de boucler sr la liste ds pokemons statique(mock-pockemon.JS)
        Pokemon.create({ //METHODE CREATE
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types.join()
        }).then(bulbizzare => console.log(bulbizzare.toJSON()))
        //traitement asynchron pr sequelize...
        //METHOD 'toJSON' pr n'afficher que ls valeurs qui ns interess
    })
 })*/

//Utilisation de favicon + morgan + bodyParser
//Methode app.use pr utiliser le nouveau middleware (favicon) puis le morgan le LOGG et le bodyParser
/*app
  .use(favicon(__dirname + '/favicon.ico')) 
  .use(morgan('dev'))
  .use(bodyParser.json()) */
  //sr ts ls pts de terminaison, on parse ttes les inputdata vers notre APIREST
 
/*Prendre en compte
  app.get('/', (req, res) => res.send('Hello, Express 👋!')) */
//Notre 1er point de terminaison definit
//METHOD de la req GET qui va prendre en param 2 elements...

/*app.get('/api/pokemons/:id/:name', (req, res) => {
    const id = req.params.id //recupere l'id et name(2params) ds l'url & send la res au client
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
    res.json(pokemon) //code concis et eff!
})*/

/*Prendre en compte
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) //recupere l'id ds l'url & send la res au client | METHOD parseInt
    const pokemon = pokemons.find(pokemon => pokemon.id === id) //METHOD find pr recup un pokemon
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message,pokemon)) //METHOD success pr avoir une res structurée
})*/

//Le nouveau pt de terminaison qui affiche le nbr total de pokemons
/*app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})*/

// On retourne la liste des pokémons au format JSON, avec un message :
/*Prendre en compte
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons)) 
  })*/

//Ajout d'un POKEMON
/*Prendre en compte
app.post('/api/pokemons', (req, res) => { //action POST + url associé st def...
    const id = getUniqueId(pokemons) //...
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
//fusion les data du pokemon recu via la req http entrante avc l'id unique généré
    pokemons.push(pokemonCreated) //ajout d'un pok a la liste des poks existants ..
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
//on genere un msg de confirmat° ds consommat de l'API REST
    res.json(success(message, pokemonCreated)) //retourne l'enssembl ds un JSON
})*/

//Modifier un pokemon (en passant pr notre APIREST)
/*Prendre en compte
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
//Modife du POKEMON, MAJ de la liste global de pok,l'ancien remplacé pr le new
//Pr chaque Pok de la liste est retourne exactmnt ls meme pok sauf s'il s'agit du Pok à modif
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    }) 
//list des pk a jour (demander pr le client), possibilité de modi un pok 
//en passant pr notre API REST
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });*/

//Suppression d'un pokemon
/*Prendre en compte
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)//
//METHOD FIND renvoi la valeur du 1er elemnt trouvé
    pokemons = pokemons.filter(pokemon => pokemon.id !== id) //METHOD JS ative 'filter'
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  }); // on obtient en retour une nouvelle liste de pokemon avc le pok suppr
  */

/*Prendre en compte
app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
//METHOD listen fournit pr express
*/
