// Reponse surmesure avc raccourci de syntaxe

exports.success = (message, data) => {
    return { message, data }
  }

/*const success = (message, data) => {
    return {
      message: message, //message concis de descript°
      data: data //data brut attendu par le consommateur
    }
  }
   
  exports.success //export de la METHOD*/

/*Via ce module on declare une METHOD success
qui prend 2 param en compte pr construire 
une nvelle rep Json mieux structuré
*/


