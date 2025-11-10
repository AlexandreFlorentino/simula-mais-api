module.exports = (sequelize, DataTypes) => {
  const UserStats = sequelize.define('UserStats', {
    userId: DataTypes.INTEGER,
    totalQuestions: DataTypes.INTEGER,
    correctAnswers: DataTypes.INTEGER,
    averageScore: DataTypes.FLOAT
  });
  return UserStats;
};