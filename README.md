# NODE-POKEMON-API-CV

1/Mise en place du Package.json (decrire le project - lister les dependances)
commande : npm init (on renseigne les champs)
on change le script "start": "node app.js" (app.js sera notre 1er pt d'entrée)
Execution de la cde ds le terminal : npm run start
2/Installation Express: npm install express --save
3/Mise en place d'un place d'un point de terminaison ds le App.js
4/Utilisation de nodemon (pr eviter de couper et relancer la meme cde)
cde : npm install nodemon --save-dev
puis npm run start ou nodemon app.js
********************************************************
Decouverte ds routes
*******************************************************
5/ls bases : Ajout ds pts de terminaison à notre APIRESt via des routes
pt de terminaison Express = app.METHODE(CHEMIN,GESTIONNAIRE(req,res))
app:instance de notre appli express / METHODE http :get,post,put,delete / GESTIONNAIRE: retourne une repose au client
Ex: Retourner le pokemon Bulbizzare (app_bis.js)
6/Passer un param depuis l'url : const id = req.params.id
7/Gerer plus params: app.get('/api/pokemons/:id/:name'...
8/Mise en place de jeu de données: Ajout du db/mock-pokemon.js
12pok,const pokemons =[{...}] puis on l'exporte à la derniere ligne pr l'utiliser prtout ailleurs (Ex: app_bis.js)
let pokemons = require('./src/db/mock-pokemon');
9/Relier ls datas ls routes express : parseInt...
10/Creer un nouveau endpoint renvoyant la liste ds pok:
pok: app.get('/api/pokemons'... | dans le res.send pokemon.length..
***********************************************************
les reponses json
***********************************************************
11/descript ds 'res' : Role APIREST intercept une 'req' HTTP et retourner une 'res' HTTP (JSON | le type MIME, qui est une entete pr indiquer que l'on renvoi bien du JSON via 'res.json(pokemon)'| code status ds la rep)
obj: formater ns 'rep' en JSON et ameliorer la struct glob de nos 'rep' pr que notre APIREST soit le + simple possible a utilisé pr ns clients
12/Embellir la 'rep' du navigateur: JSON Viewer (chrome)
13/ organiser ds 'rep': via de 'petits messages complémentaires' dans la 'rep JSON'.
helper.js: On met en place une METHOD OUTIL qui renverra une 'rep' pr ns pts de terminaison avec un mess explicatif et ls datas
helper.js (export vers app.js)
14/Retourner une data list (JSON) cf fichier app.js
***************************************************************
Middlewares, fct JS qui ont accès à certaines datas express
***************************************************************
15/next() pr indiquer que le middleware est terminé à express
16/Cas utilisation : 1/5 Middleware d'applicat° (METHOD use(app.use(...))| 2/5 Middleware routeur relié au routeur d'express,on le branche sur expressRouter() pr créer un ss enssemble de route et definir une hierarchie de cs memes routes (pour les grosses API) |
3/5 Middleware traitement err : regles ds 4 arg (ex: app.use(function(err,req,res,next)...)) | 4/5 Middleware intégré: express.static, servir ds docs statiques depuis une APIREST comme ds images ou un PDF | 5/5 Middlewares tiers: modules JS à installés
17/Créer un Middleware: chargé l'url ds req entrantes vrs notre APIREST
18/Installer un MiddleWare déja existant:
npm install morgan --save-dev, puis on l'importe (require dans l'app..js) pr le detail de msg de log que l'on souhaite affiché.
msg affichant le code statut, l'url...
19/ Comm° entre ls Middlewares : possibilité de pls middleware interconnect entre eux pr les req et res... formant une chaine et communiquant entre eux en se transmettant leur param respectif,
attention a executer le next()pour passer au middleware suivant sinn la requete risque d'etre bloqué
20/Combiner ds Middlewares : ajout de flavicon à notre APIREST
dans l'onglet de notre navigateur
npm install serve-favicon --save avec fave.ico comme extension que l'on telecharge 
Ordre des Middleware très important!!!, ex : midlleware log avant middleware err...
**************************************************************
API Rest complète
**************************************************************
21/Ajout d'un POK: action(POST + url (localhost5000:api/pokemons + ) + data du pok (info du nouveau pok que l'on veut ajouter à l'API)
22/ helper.js : Method getUniqueId  qu'on exporte ds le app_bis.js : on transforme le arr des pok pr un arr d'id de pok (on stock dans const pokemonsIds) via la METHOD map (comme une forLoop mais retourne un nouveau arr) | plus tard la db mySql qui se chargera
23/Insomnia : install, davantage plus developpeur friendly
24/METHOD GET avec Insomnia | http://localhost:5001/api/pokemons
25/METHOD POST avec Insomnia, on ecrit le JSON que l'on veut insérer à notre backend (Pas de id, ni de created (car le fichier JSON non dynamique), role du serveur qui est capable d'uniformiser ttes ls dates!)
Pas possible, la solution, utiliser un Middleware! (url:str,insomn renvoi un Json)
26/Parser ns datas avc un Middleware:
ex: const userString = '{"name":"Christophe", "age": 29}'
const userJson = JSON.parse(userString)
opération inverse pr obtenir ls data inv retourner au client
console.log(JSON.stringify(userJson)); //{"name":"Christophe", "age": 29}
Parse ds data entrante de notre APIREST pr recup ds datas directmnt au format JSON, solution "body-parser"
npm install body-parser --save, on importe ce middleware dans app.js
27/Modifier un pok: Method map
28/Supprimer un pok: Method find puis filter
*************************************************************
Base de données
*************************************************************
29/Telecharg. de XAMPP - relier notre APIREST à la DB
serveur web apache | db mariaDB | appliweb PHPMyAdmin
30/Demarrer la DB
31/
32/
33/