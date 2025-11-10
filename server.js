const express = require('express');
const cors = require('cors'); // ← IMPORTANTE para frontend conversar
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite frontend acessar backend
app.use(express.json()); // Permite receber JSON

const routes = require('./routes');
app.use('/api', routes); // ← ISSO ESTÁ FALTANDO!

// Rota raiz (opcional)
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Simula+ API funcionando!',
    status: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Servidor rodando na porta ${PORT}`);
});
