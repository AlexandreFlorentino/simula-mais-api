const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const routes = require('./src/routes');  

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Simula+ API funcionando!',
    status: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Servidor rodando na porta ${PORT}`);
});
