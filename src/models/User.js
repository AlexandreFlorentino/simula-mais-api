module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataNascimento: {
      type: DataTypes.DATE
    },
    grauEscolar: {
      type: DataTypes.ENUM('ENSINO_MEDIO', 'GRADUACAO', 'POS_GRADUACAO')
    },
    objetivo: {
      type: DataTypes.ENUM('ENEM', 'CONCURSO', 'VESTIBULAR', 'OUTRO')
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};