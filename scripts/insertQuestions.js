const { Question, sequelize } = require('../models');

// COLE AQUI as questões que o freelancer te enviar
const novasQuestoes = [
  {
    enunciado: "Qual é a capital do Brasil?",
    opcoes: {
      "A": "São Paulo", 
      "B": "Rio de Janeiro",
      "C": "Brasília",
      "D": "Salvador", 
      "E": "Belo Horizonte"
    },
    respostaCorreta: "C",
    materia: "Geografia",
    dificuldade: "FACIL",
    origem: "ENEM-2023"
  },
  // COLE mais questões aqui no mesmo formato
];

async function inserirQuestoes() {
  try {
    console.log('📥 Inserindo novas questões...');
    
    for (const questao of novasQuestoes) {
      const [novaQuestao, created] = await Question.findOrCreate({
        where: { enunciado: questao.enunciado },
        defaults: questao
      });
      
      if (created) {
        console.log(`✅ "${questao.enunciado.substring(0, 50)}..."`);
      } else {
        console.log(`⚠️  Já existe: "${questao.enunciado.substring(0, 50)}..."`);
      }
    }
    
    console.log('🎉 Questões inseridas com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await sequelize.close();
  }
}

inserirQuestoes();