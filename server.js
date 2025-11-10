const express = require('express');
const cors = require('cors'); // ← INSTALAR: npm install cors
const app = express();
const PORT = process.env.PORT || 3000;

// ⭐⭐⭐ MIDDLEWARES CRÍTICOS ⭐⭐⭐
app.use(cors());
app.use(express.json());

// ⭐⭐⭐ ISSO ESTÁ FALTANDO ⭐⭐⭐
const routes = require('./routes');
app.use('/api', routes); // ← CONECTA TODAS AS ROTAS!

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Simula+ API funcionando!',
    status: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Servidor rodando na porta ${PORT}`);
});
