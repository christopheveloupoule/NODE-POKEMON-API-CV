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
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
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