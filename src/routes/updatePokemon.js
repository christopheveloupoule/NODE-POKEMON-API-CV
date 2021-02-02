const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => { //return la promess finByPk
        if(pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }
        //recup un pok avc un certain id en db et on peut ensuite le retourner à notre client
        //2req pr une simple donnée
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
      /*.catch(error => { //req sequelize echoue
        const message = `Le pokémon n'a pu être modifié. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      }) Rajout du 'return' à la METHOD findByPk*/
    })
    .catch(error => { //req sequelize echoue
      const message = `Le pokémon n'a pu être modifié. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}