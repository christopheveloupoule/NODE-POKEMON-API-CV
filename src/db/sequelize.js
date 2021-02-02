const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
//on instancie le model user aupres de Sequelize
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types //.join() //plus besoin de join grace au getter & setter
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

//Fonctionnement de la METHOD hash,en param pwd + hash
    bcrypt.hash('pikachu', 10)
//une fois la METHOD hash appelée, on recupe le pwd crypté
    .then(hash => User.create({ username: 'pikachu', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')

//METHOD create, on pousse un nouveau user ds la db
    User.create({
      UserName: 'pikachu',
      password: 'pikachu'
    })
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User //permet d'initialiser la DB, on peut utiliser ailleurs en export
}

