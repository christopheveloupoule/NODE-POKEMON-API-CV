const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); //jeton
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
//METHOD 'findOne' : req pr determiner les infos d'un user
    User.findOne({ where: { username: req.body.username } }).then(user => {

        if(!user) { //ident
            const message = `L'utilisateur demandé n'existe pas.`
            return res.status(404).json({ message })
        }

//METHOD 'compare' du module 'bcrypt' pwd user au pwd de la db        
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) { //eventualite de mot de passe erroné
            const message = `Le mot de passe est incorrect.`
            return res.status(401).json({message})
          }

// Générer un jeton JWT valide pendant 24 heures.
//avc la METHOD 'sign' du module JWT
        const token = jwt.sign(
            { userId: user.id },
            privateKey,
            { expiresIn: '24h' }
          );

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
//On retourne le jeton fraichement crée
      })
    })
    .catch(error => { //cas d'erreur générique, appel réseau qui echouerait par exemple
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
    })
  })
}