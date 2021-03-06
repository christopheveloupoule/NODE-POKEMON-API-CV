const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') //Import du MiddleWarre d'authent
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, { //modife du pok en db
      where: { id: id }
    })
    .then(_ => { //return la promess finByPk*/
      return Pokemon.findByPk(id).then(pokemon => { /*Recup un pok avc un id en db, et 
on peut ensuite le retourner à nos client
Le "return"permet de transmettre l'err eventuel de findByPk ds le 
bloc catch situé plus bas ds le code*/
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
      if(error instanceof ValidationError) { //Ex:si ajout de str dans les pts de vie
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `Le pokémon n'a pu être modifié. 
                        Réessayez dans quelques instants.`
      res.status(500).json({ message, data: error })
    })
  })
}