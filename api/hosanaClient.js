const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const qs = require('qs');

const BASE_URL = 'https://aio-mngr.fsfx.org.br';
const jar = new tough.CookieJar();

const client = wrapper(axios.create({
  baseURL: BASE_URL,
  jar,
  withCredentials: true,
}));

async function login(username, password) {
  const loginPage = await client.get('/login.php');
  const $ = cheerio.load(loginPage.data);
  const csrfToken = $('input[name="csrf_token"]').val();

  if (!csrfToken) {
    throw new Error('CSRF token não encontrado');
  }

  const data = qs.stringify({
    csrf_token: csrfToken,
    username,
    password,
    language: 'pt-BR'
  });

  const response = await client.post('/login.php', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    maxRedirects: 0,
    validateStatus: status => status === 302 || status === 200
  });

  console.log('✅ Login realizado com sucesso');
}

async function checkIn(agentId) {
  const data = qs.stringify({
    agent_id: agentId,
    action: 'check_in'
  });

  const res = await client.post('/modules/dashboards/attendance/agent-action/', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return res;
}

module.exports = {
  login,
  checkIn
};
