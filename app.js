const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module

//const helper = require('helper.js') //import du module helper
const { success } = require('./helper.js') //desctruturat°

let pokemons = require('./mock-pokemon'); //import list pokemons, puis pt de terminaison...
  
const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = 5001 // port sur lequel on va demarrer notre APIREST pr la suite
  
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
app.get('/api/pokemons/', (req, res) => res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`))
  
app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
//METHOD listen fournit pr express