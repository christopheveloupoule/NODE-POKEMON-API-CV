const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
//METHOD 'findOne' : req pr determiner les infos d'un user
    User.findOne({ where: { username: req.body.username } }).then(user => {
//MEETHODE 'compare' du module 'bcrypt' pwd user au pwd de la db        
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(isPasswordValid) {
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user })
        }
      })
    })
  })
}