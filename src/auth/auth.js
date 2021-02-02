//Utilisat° d'un Middleware pr vérif la validité ds jetons JWT transmis pr ns clients

const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
//Dans cette entete transite ns jetons renvoyé par nos consommateurs
  const authorizationHeader = req.headers.authorization

//On verif que le jeton a bien été fourni

  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
  
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {//METHOD VERIFY
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next() //ts ces test verifié, le user peut acceder à l'enssemble ds pts de terminaison qu'il a demandé
    }
  })
}