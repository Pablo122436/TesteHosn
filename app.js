const express = require('express');
const path = require('path');
const hosanaClient = require('./api/hosanaClient');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos (HTML, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para check-in
app.post('/check-in', async (req, res) => {
  const { agent_id } = req.body;

  try {
    const response = await hosanaClient.checkIn(agent_id);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: 'Erro ao tentar registrar check-in',
      details: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
