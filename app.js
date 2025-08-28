const express = require('express');
const path = require('path');
const hosanaClient = require('./api/hosanaClient');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Login automático ao iniciar o servidor
(async () => {
  try {
    await hosanaClient.login('ux11015', 'Fsfx@2024'); // ← use seu usuário e senha
    console.log('🚀 Login feito com sucesso!');
  } catch (err) {
    console.error('❌ Falha no login automático:', err.message);
  }
})();

// Rota de check-in
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

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
});
