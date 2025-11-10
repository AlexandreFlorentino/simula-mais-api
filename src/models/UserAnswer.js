module.exports = (sequelize, DataTypes) => {
  const UserAnswer = sequelize.define('UserAnswer', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    simuladoId: DataTypes.INTEGER,
    selectedOption: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN
  });
  return UserAnswer;
};