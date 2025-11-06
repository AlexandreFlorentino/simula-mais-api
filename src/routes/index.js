const express = require('express');
const router = express.Router();

// Importar controllers
const authController = require('../controllers/authController');
const simuladoController = require('../controllers/simuladoController');
const questionController = require('../controllers/questionController');

// Importar middleware
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');

// Rotas públicas
router.post('/auth/register', rateLimit.auth, authController.register);
router.post('/auth/login', rateLimit.auth, authController.login);

// Rotas de questões (públicas com limite)
router.get('/questions', rateLimit.public, optionalAuth, simuladoController.getQuestions);

// Rotas protegidas
router.get('/auth/profile', authenticateToken, authController.getProfile);
router.post('/simulados/submit', authenticateToken, rateLimit.submit, simuladoController.submitSimulado);
router.get('/estatisticas', authenticateToken, simuladoController.getEstatisticas);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Simula+ API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;