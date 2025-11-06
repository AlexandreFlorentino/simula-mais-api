const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '✅ SIMULA+ BACKEND ONLINE!',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Simula+ API funcionando!',
    status: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Servidor rodando na porta ${PORT}`);
});