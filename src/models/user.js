module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', { // modele user avc regle de validation...
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: { //Ajout d'une contrainte d'unicité
            msg: 'Le nom est déjà pris.'
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }