const axios = require('axios');
const qs = require('qs');

const PHPSESSID = 'kg5bpamf1vu7mkvq0o4s75sg13'; // Sessão ativa
const BASE_URL = 'https://aio-mngr.fsfx.org.br';

function checkIn(agentId) {
  const data = qs.stringify({
    agent_id: agentId,
    action: 'check_in'
  });

  return axios.post(`${BASE_URL}/modules/dashboards/attendance/agent-action/`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': `PHPSESSID=${PHPSESSID}; hsna_theme=; hsna_lang=pt-BR`
    }
  });
}

module.exports = {
  checkIn
};
