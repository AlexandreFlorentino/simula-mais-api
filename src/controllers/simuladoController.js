const { Question, Simulado, UserAnswer, UserStats, sequelize } = require('../models');

const simuladoController = {
  async getQuestions(req, res) {
    try {
      const { materia, dificuldade, limit = 10, tipo = 'ENEM' } = req.query;
      
      let whereClause = { origem: tipo };
      
      if (materia) whereClause.materia = materia;
      if (dificuldade) whereClause.dificuldade = dificuldade;

      const questions = await Question.findAll({
        where: whereClause,
        limit: parseInt(limit),
        order: sequelize.random(), // Ordem aleatória
        attributes: { 
          exclude: ['respostaCorreta', 'explicacao'] 
        }
      });

      res.json({
        success: true,
        data: {
          questions,
          total: questions.length
        }
      });

    } catch (error) {
      console.error('Erro ao buscar questões:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  },

  async submitSimulado(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { respostas, tempoUtilizado, tipoSimulado } = req.body;
      const userId = req.user.id;

      // Criar registro do simulado
      const simulado = await Simulado.create({
        userId,
        tipo: tipoSimulado,
        tempoUtilizado,
        dataRealizacao: new Date()
      }, { transaction });

      // Processar cada resposta
      let acertos = 0;
      const respostasSalvas = [];

      for (const resposta of respostas) {
        const question = await Question.findByPk(resposta.questionId, { transaction });
        
        const isCorreta = question.respostaCorreta === resposta.respostaEscolhida;
        if (isCorreta) acertos++;

        const userAnswer = await UserAnswer.create({
          userId,
          questionId: resposta.questionId,
          simuladoId: simulado.id,
          respostaEscolhida: resposta.respostaEscolhida,
          isCorreta,
          tempoQuestao: resposta.tempoQuestao
        }, { transaction });

        respostasSalvas.push(userAnswer);
      }

      // Calcular estatísticas
      const totalQuestoes = respostas.length;
      const porcentagemAcertos = (acertos / totalQuestoes) * 100;

      // Atualizar simulado com resultados
      await simulado.update({
        totalQuestoes,
        acertos,
        porcentagemAcertos
      }, { transaction });

      // Atualizar estatísticas do usuário
      await this.atualizarEstatisticasUsuario(userId, acertos, totalQuestoes, transaction);

      await transaction.commit();

      res.json({
        success: true,
        data: {
          simulado: {
            id: simulado.id,
            acertos,
            totalQuestoes,
            porcentagemAcertos,
            tempoUtilizado
          },
          respostas: respostasSalvas.map(r => ({
            questionId: r.questionId,
            isCorreta: r.isCorreta
          }))
        }
      });

    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao submeter simulado:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  },

  async atualizarEstatisticasUsuario(userId, novosAcertos, totalQuestoes, transaction) {
    let userStats = await UserStats.findOne({ 
      where: { userId },
      transaction 
    });

    if (!userStats) {
      userStats = await UserStats.create({
        userId,
        totalSimulados: 0,
        totalQuestoesRespondidas: 0,
        totalAcertos: 0,
        porcentagemGeral: 0
      }, { transaction });
    }

    // Atualizar estatísticas
    await userStats.update({
      totalSimulados: userStats.totalSimulados + 1,
      totalQuestoesRespondidas: userStats.totalQuestoesRespondidas + totalQuestoes,
      totalAcertos: userStats.totalAcertos + novosAcertos,
      porcentagemGeral: ((userStats.totalAcertos + novosAcertos) / 
                        (userStats.totalQuestoesRespondidas + totalQuestoes)) * 100
    }, { transaction });
  },

  async getEstatisticas(req, res) {
    try {
      const userId = req.user.id;

      const userStats = await UserStats.findOne({ 
        where: { userId },
        include: [{
          model: require('../models').User,
          attributes: ['nome', 'objetivo']
        }]
      });

      // Buscar últimos simulados
      const ultimosSimulados = await Simulado.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: 5
      });

      res.json({
        success: true,
        data: {
          estatisticas: userStats,
          ultimosSimulados
        }
      });

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
};

module.exports = simuladoController;