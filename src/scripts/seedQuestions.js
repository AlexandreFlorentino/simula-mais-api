const { Question, User, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando população do banco de dados...');

    // Sincronizar modelos (cria tabelas)
    await sequelize.sync({ force: false });
    console.log('✅ Tabelas sincronizadas');

    // Inserir questões
    const questions = [
      {
        enunciado: 'Qual é a capital do Brasil?',
        opcoes: {
          A: "São Paulo",
          B: "Rio de Janeiro", 
          C: "Brasília",
          D: "Salvador",
          E: "Belo Horizonte"
        },
        respostaCorreta: 'C',
        materia: 'Geografia',
        dificuldade: 'FACIL',
        ano: 2023,
        origem: 'ENEM-2023',
        explicacao: 'Brasília foi fundada em 1960 para ser a capital do Brasil, substituindo o Rio de Janeiro.'
      },
      {
        enunciado: 'Assinale a alternativa que contém apenas vogais:',
        opcoes: {
          A: "a, e, i, o, u",
          B: "b, c, d, f, g",
          C: "a, b, c, d, e", 
          D: "1, 2, 3, 4, 5",
          E: "!, @, #, $, %"
        },
        respostaCorreta: 'A',
        materia: 'Português',
        dificuldade: 'FACIL', 
        ano: 2023,
        origem: 'ENEM-2023',
        explicacao: 'As vogais da língua portuguesa são: A, E, I, O, U.'
      },
      {
        enunciado: 'Qual das seguintes alternativas é um número primo?',
        opcoes: {
          A: "10",
          B: "15",
          C: "21",
          D: "29",
          E: "33"
        },
        respostaCorreta: 'D',
        materia: 'Matemática',
        dificuldade: 'MEDIO',
        ano: 2023,
        origem: 'ENEM-2023',
        explicacao: 'Números primos são divisíveis apenas por 1 e por eles mesmos. 29 atende a essa condição.'
      }
    ];

    for (const questionData of questions) {
      const [question, created] = await Question.findOrCreate({
        where: { enunciado: questionData.enunciado },
        defaults: questionData
      });
      
      if (created) {
        console.log(`✅ Questão criada: ${questionData.enunciado.substring(0, 50)}...`);
      }
    }

    // Criar usuário teste
    const hashedPassword = await bcrypt.hash('123456', 12);
    const [user, userCreated] = await User.findOrCreate({
      where: { email: 'teste@simulamais.com' },
      defaults: {
        nome: 'Usuário Teste',
        email: 'teste@simulamais.com',
        password: hashedPassword,
        objetivo: 'ENEM',
        grauEscolar: 'ENSINO_MEDIO'
      }
    });

    if (userCreated) {
      console.log('✅ Usuário teste criado: teste@simulamais.com / 123456');
    }

    console.log('🎉 População do banco concluída!');
    console.log(`📚 Total de questões: ${await Question.count()}`);
    console.log(`👤 Total de usuários: ${await User.count()}`);

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
  } finally {
    await sequelize.close();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;