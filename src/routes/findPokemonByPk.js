const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id) // En param, l'id du pok a recup avec une promesse suivant les infos demandées
    //Method findByPk, on n'en a plus besoin de parseInt ('1'=1...) grace à findByPk
    .then(pokemon => {
      if(pokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
        return res.status(404).json({ message })
      }
      const message = 'Un pokémon a bien été trouvé.'
      res.json({ message, data: pokemon })
    })
      .catch(error => { //req sequelize echoue
        const message = `La liste des pokémons n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}