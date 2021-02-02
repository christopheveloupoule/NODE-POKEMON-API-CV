//Pr recuperer la liste de tous les POKEMONs
const { Pokemon } = require('../db/sequelize')
//Import de l'opérateur Sequelize
const { Op } = require('sequelize')
  
module.exports = (app) => { //export une fct qui prend en param l'appli express tt entiere
//permet de def ls routes + simplement ds notre appli tt en ayant ds pts de terminaison 
//separé ds pls modules distinct
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) { //indique a express d'extraire le param 'name' de l'url
      const name = req.query.name
//METHOD findAll, récupere ls datas depuis SQL
      return Pokemon.findAll({
        where: { 
          name: { //'name', propriété du modele pokemon
            [Op.like]: `%${name}%` //'name', critère de recherche
//En Sequelize ts ls operateur s'utilise avc ds crochets
// % pr indiquer ou effectuer la recherche du pokemon en question
        }
       },
       limit: 5 //indique une limite de pok a afficher...
      })
      .then(pokemons => {
        const message = `Il y a ${pokemons.length} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: pokemons })
      })
    } else {
      Pokemon.findAll() //Method qui retourne une promesse contenant la liste de ts les pokemons présent ds la db
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}