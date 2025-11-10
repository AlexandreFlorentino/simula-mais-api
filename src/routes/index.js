const express = require('express');
const router = express.Router();
const path = require('path');
const questions = require(path.join(__dirname, '../data/questions.json'));

const authController = require('../controllers/authController');
const simuladoController = require('../controllers/simuladoController');
const questionController = require('../controllers/questionController');

const { authenticateToken, optionalAuth } = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');

router.post('/auth/register', rateLimit.auth, authController.register);
router.post('/auth/login', rateLimit.auth, authController.login);

router.get('/questions', rateLimit.public, optionalAuth, (req, res) => {
  res.json(questions);
});

router.get('/auth/profile', authenticateToken, authController.getProfile);
router.post('/simulados/submit', authenticateToken, rateLimit.submit, simuladoController.submitSimulado);
router.get('/estatisticas', authenticateToken, simuladoController.getEstatisticas);

router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Simula+ API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
