//Pr recuperer la liste de tous les POKEMONs ds la DB
const { Pokemon } = require('../db/sequelize')
//Import de l'opérateur Sequelize
const { Op } = require('sequelize')

const auth = require('../auth/auth')
  
module.exports = (app) => { //export une fct qui prend en param l'appli express tt entiere
//permet de def ls routes + simplement ds notre appli tt en ayant ds pts de terminaison 
//separé ds pls modules distinct
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) { //indique a express d'extraire le param 'name' de l'url
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
//on def une cst limit qui a pr val 'le param transmit pr le user' ou par def 5
//express transmet tt ls params ss forme de string et limit est un nbre

    if(name.length < 2) {
      const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
      return res.status(400).json({ message })        
    }

      //return Pokemon.findAll({//METHOD findAll, récupere ls datas depuis SQL
      return Pokemon.findAndCountAll({ //nbr tot de resul + resul demande ds la db
        where: { 
          name: { //'name', propriété du modele pokemon
            [Op.like]: `%${name}%` //'name', critère de recherche
//En Sequelize ts ls operateur s'utilise avc ds crochets
// % pr indiquer ou effectuer la recherche du pokemon en question
        }
       },
       order: ['name'],//prop du modele sequelize pr ordonner ls result (par def ordr croiss)
//limit: 5 //indique une limite de pok a afficher...
       limit: limit
//on attribue une limite de resultat a notre req sequelize, en se basant sur le nbr determ previously

      })
      //.then(pokemons => {
      .then(({count, rows}) => { //on recup les 2 infos de la METHOD findAllCount
        //const message = `Il y a ${pokemons.length} pokemons qui correspondent au terme de recherche ${name}.`
        //res.json({ message, data: pokemons })
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({ order: ['name'] }) //prop du modele sequelize pr ordonner ls result (par def ordr croiss)
  //Method qui retourne une promesse contenant la liste de ts les pokemons présent ds la db
      .then(pokemons => { //Cas de succes
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {//cas d'echec
        const message = `La liste des pokémons n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}