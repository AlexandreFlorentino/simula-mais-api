module.exports = (sequelize, DataTypes) => {
  const Simulado = sequelize.define('Simulado', {
    userId: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    completed: DataTypes.BOOLEAN
  });
  return Simulado;
};