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
29/Telecharg. de XAMPP (enssemble de logiciel pr faire tourner un db SQL sur notre poste de travail ) - relier notre APIREST à la DB
serveur web apache | db mariaDB | appliweb PHPMyAdmin (visualiser et interagir avc notre db mysql directement depuis une interface web)
30/Demarrer la DB
31/ORM (sorte de blackbox): db <-- OjectRelationalMapping(sequelize) <-- API Rest
technique de prog qui permet de convertir ds DB en JS, on continu le dev de
notre APIRest ms on va interagir avc ds {} JS fournit pr l'ORM
Av: Pas besoin d'apprendre le langage de requete SQL (les notions de table, champs...),
on use le JS
requete simple via ORM : findAll, findOne...
32/ORM sequelize: basé sr les promess de JS. permet de gerer les traitement async +eff que de simples callback
sequelize support la plupart ds DB SQL (postgreSQL,MySQL,MsSql,SQlyte ) /tres bien documenté...,basé sur les Promises
cde : npm install sequelize --save
une fois sequelize installé, installé un DRIVER (qui intervient lorsque l'ORM se connect à la DB)
XAMPP a installé la db MariaDB, il faut dc installé le DRIVER correspondant pr la connex° sequelize <--> MariaDB
cde : npm install mariadb --save,
maintenant Sequelize fait parti intégrante de notre APIRest
Pr verif si Sequelize et le driver pr MariaDB a bien été installé, voir le package.json
33/Connecter Sequelize, MariaDB et notre APIRest qu'il faut assembler pr obtenir un result,
pr le moment Sequelize ds le folder nodemoudle de l'APIRest et MariaDB qq part sr notre poste de travail via XAMPP.
Sequelize tres simple de config pr la connec a une DB en 3 etapes, 
ds le fichier app.js : 1/import du module Sequelize 2/Config et creer une inst de la class Sequelize 3/Test l'authentif via la METHOD aunthenticate() ss forme de promess..
*************************************************************
Demarrer XAMPP puis npm start!
Message d'err: Unknown database 'pokedex', on crée dc la DB ds PHPmyADMIN! puis on relance 'npm start' ds VSC!
************************************************************
34/Organisation de mon code : app.js, trop de role!!!
Initialisation de notre serveur express/Connexion DB SQL/
Gestion des routes et ds points de terminaisons
Mise en place d'une architecture! 
But: construire notre ApiRest sur notre DB
************************************************************
API REST & DB
************************************************************
35/Ls modèles Sequelize: comment il fct de l'interieur, il faut prendre connaissnce du concept de 'models'!.
Un 'model' represente une table ds notre DB.
On déclare un model 'pokemon' qui representera la table contenant les pokemons ds la DB 'pokemons'.
Model : {}JS fournit par Sequelize que l'on peut param
36/Creer notre modele Sequelize: On declare un {}JS en respectant les convent° proposé pr Sequelize
src/models/pokemon.js (REM : on commence à strutcuré notre dossier)
On va pouvoir se debarraser du helpers.js
La db est source de vérité
37/Synchroniser le modèle avc la dB:
On a crée un modele Sequelize(ds le code JS) coté APIRest pr le moment, maintenant il faut lui indiquer explicitement de creer la DB qui est associé. On doit dc pousser ns model sur la DB
1 Modele Sequelize = 1 Table SQL, on obtient une table de donnée ds PHP mais on va MAJ notre app.js
38/Instancier un modele Sequelize: Comment remplir avc ds datas notre table pokemon. Fct interne de Sequelize
Creer des Instances de pokemon cad ajouter de nouveaux pok grace a notre model Sequelize 'pokemon model' directemnt en DB (METHOD Create()). on reprend app.js pr mettre en appli cette METHOD
39/Initialiser la DB avc 12 pok au demarrage de notre APIRest: METHOD Creat()
40/Restrutcurer notre architecture: 
app.js (alléger) / helper.js (supprimer ce module) / src/db/mock-pockemon.js (modifier son emplacement)  / src/db/sequelize.js : creer ce nouveau fichier dédié à la connexion à notre db chargé de generer et d'exposer ds 'models' Sequelize ds le reste de notre APIRest.
Notre point d'entrée app.js: demarrer un serveur express avc un code simple & minimaliste
obj: creer ds pts terminaison + complet directement relié à notre DB.
41/Recuperer l'ensemble ds données: Pr le moment on sait relier notre API directement à Sequelize, mais encore mise en place tte la chaine.
42/Pr recupe tts les infos de ts ls pokemons,on utilisera la  'METHOD findAll()' : src/routes/findAllPokemons.js
Recuperer l'enssemble des pok 'METHOD findAll()' 
43/Recuperer un pok 'METHOD findByPk()'
44/Ajouter un pok, METHOD 'create(), test via Insomnia
Suivant le message d'err, "type" doit etre renommé en "types"
45/Enrichir ns models avc ls "Getters" & "Setters":
Format de type de données pas le meme côté APIRest et DB, 
il faudrait convertir lr type "automatiquement" au bon format:
on insere au niveau de la propiete types de src/model/pokemon.js
46/Modife un Pokemon en DB: 
47/Modife d'un POK : METHOD updatePokemon.js
48/Suppression d'un pok: METHOD destro() de sequelize
Conclusion: on retrouve un backend complet:
un serveur developpé avec NodeJS / une APIRest réalisé avec Express qui est directement relié / avc un db mySQL
49/
50/


