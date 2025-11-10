const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Importar modelos
const User = require('./User')(sequelize, Sequelize);
const Question = require('./Question')(sequelize, Sequelize);
const Simulado = require('./Simulado')(sequelize, Sequelize);
const UserAnswer = require('./UserAnswer')(sequelize, Sequelize);
const UserStats = require('./UserStats')(sequelize, Sequelize);

// Associações
User.hasMany(Simulado, { foreignKey: 'userId' });
Simulado.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UserAnswer, { foreignKey: 'userId' });
UserAnswer.belongsTo(User, { foreignKey: 'userId' });

Question.hasMany(UserAnswer, { foreignKey: 'questionId' });
UserAnswer.belongsTo(Question, { foreignKey: 'questionId' });

Simulado.hasMany(UserAnswer, { foreignKey: 'simuladoId' });
UserAnswer.belongsTo(Simulado, { foreignKey: 'simuladoId' });

User.hasOne(UserStats, { foreignKey: 'userId' });
UserStats.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Question,
  Simulado,
  UserAnswer,
  UserStats
};
