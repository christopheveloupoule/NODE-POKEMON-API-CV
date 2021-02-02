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
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
          notNull: { msg: 'Le nom est une propriété requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégât.' },
          notNull: { msg: 'Les points de dégâts sont une propriété requise.'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
        }
      }
    }, {//Option de parametrage global
      timestamps: true, //Modofier le comportement par defaut de sequelize
      createdAt: 'created', //Date de creation d'un new pokemon
      updatedAt: false //Date de modife d'une instance (false, desactivation)
    })
  }