module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    enunciado: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    opcoes: {
      type: DataTypes.JSONB,
      allowNull: false // { A: "texto", B: "texto", C: "texto", D: "texto", E: "texto" }
    },
    respostaCorreta: {
      type: DataTypes.STRING, // A, B, C, D, E
      allowNull: false
    },
    materia: {
      type: DataTypes.STRING, // Matemática, Português, etc.
      allowNull: false
    },
    dificuldade: {
      type: DataTypes.ENUM('FACIL', 'MEDIO', 'DIFICIL'),
      defaultValue: 'MEDIO'
    },
    ano: {
      type: DataTypes.INTEGER // Ano da prova
    },
    origem: {
      type: DataTypes.STRING // ENEM-2022, CONCURSO-X-2023
    },
    explicacao: {
      type: DataTypes.TEXT // Explicação da resposta
    }
  }, {
    tableName: 'questions',
    timestamps: true
  });

  return Question;
};