//Def des différentes typesqui peuvent être à un pokemon
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']


/*export d'une fct a 2params, sequelize (obj) connec° a la DB,
l'interet de cette{},il a une propriete 'define' qui permet 
de declarer un nouveau model aupres de sequelize*/

/*Param DataTypes*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', { //METHOD DEFINE
    //Description de notre modèle qui sera traduit en colonne dans la table pr la suite...
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { // validateur
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
          notNull: { msg: 'Le nom est une propriété requise.'},
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { // validateur
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points de vie doivent être inférieures ou égales à 999.'
          },
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { // validateur
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégât.' },
          notNull: { msg: 'Les points de dégâts sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de dégâts doivent être supérieurs ou égales à 0.'
          },
          max: {
            args: [99],
            msg: 'Les points de dégâts doivent être inférieures ou égales à 99.'
          },
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { // validateur
          isUrl: { msg: `Utilisez uniquement une URL valide pour l'image.` },
          notNull: { msg: `L'image est une propriété requise.`}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() { //getter def au sens de sequelize, transforme une str en arr de str(DB=>API)
          return this.getDataValue('types').split(',')
        },
        set(types) { // a l'inverse le setter, transformer le arr ds types de Pokemon en str unique(API=>DB)
          this.setDataValue('types', types.join())
        },
        validate: { //Validateur personnalisé sur mesure!!
          isTypesValid(value) { //fonction de nom arbitraire
            if(!value) { /*en param la valeur value de la propriete types contenu ds la db
sans prendre en compte le getter ou le setter de cette propr*/
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => { /*on verife chacun ds types d'un pok
pr savoir si il est bien inclu ds la liste de pok*/
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }  
      }
    }, {//Option de parametrage global
      timestamps: true, //Modofier le comportement par defaut de sequelize
      createdAt: 'created', //Date de creation d'un new pokemon
      updatedAt: false //Date de modife d'une instance (false, desactivation)
    })
  }