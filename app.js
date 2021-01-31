const express = require('express') 
//Mot clé "require" indique à nodeJS d'aller chercher
// la dependance 'express' ds le folder node module
  
const app = express() //creat° d'une instance de l'appli express grace à la METHOD du meme nom
const port = 3000 // port sur lequel on va demarrer notre APIREST pr la suite
  
app.get('/', (req, res) => res.send('Hello, Express 👋!'))
//Notre 1er poitn de terminaison definit
//METHOD de la req GET qui va prendre en param 2 elements...

app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id //recupere l'id ds l'url & send la res au client
    res.send(`Vous avez demandé le pokémon n°${id}`)
})
  
app.listen(port, () => 
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
//METHOD listen fournit pr express