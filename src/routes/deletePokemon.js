const { Pokemon } = require('../db/sequelize')

const auth = require('../auth/auth') //Import du MiddleWarre d'authent
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => { //recup le pok av de le suppr
      if(pokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }
      
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({ // suppress° def du pok en db grace à la methode sequelize destroy
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      .catch(error => { //req sequelize echoue
        const message = `Le pokémon n'a pu être supprimé. 
                          Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    })
  })
}