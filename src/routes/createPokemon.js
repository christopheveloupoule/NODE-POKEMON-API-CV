const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

const auth = require('../auth/auth') //Import du MiddleWarre d'authent
  
module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(error => { //req sequelize echoue
        if(error instanceof ValidationError) { //verif si err de validation Sequelize
          return res.status(400).json({ message: error.message, data: error }); //faute du client
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `La liste des pokémons n'a pas pu être ajouté. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}