const { Pokemon } = require('../db/sequelize') 
//import ds le pt de terminaison le modele Pokemon (fournit pr sequelize)
  
module.exports = (app) => { //export une fct qui prend en param l'appli express tt entiere
//permet de def ls routes + simplement ds notre appli tt en ayant ds pts de terminaison 
//separé ds pls modules distinct
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll() //Method qui retourne une promesse contenant la liste de ts les pokemons présent ds la db
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}