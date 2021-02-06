/*//METHOD outil
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
   
  exports.success //export de la METHOD retourner directement L1*/

/*Via ce module on declare une METHOD success
qui prend 2 param en compte pr construire 
une nvelle rep Json mieux structuré
*/
/////////////////////////////////////////////////////////////////
/*METHOD outil
exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map(pokemon => pokemon.id)
//on transforme le arr des pok pr un arr d'id de pok 
//grace a la METHOD map (comme une forLoop mais retourne un nouveau arr)
  const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b))
//Calcul de l'id existant le +gd parmis la list d'id de pok exist
//reduce compare ls elements 2à2 ds un arr
//la cst retourne dc le maxId...
  const uniqueId = maxId + 1 //increment l'id du pokemon de 1
    
  return uniqueId
}
*/

