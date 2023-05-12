const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://www.mesto-akoroleva.nomoredomains.monster',
  'https://mesto-akoroleva.nomoredomains.monster',
  'http://www.mesto-akoroleva.nomoredomains.monster',
  'http://mesto-akoroleva.nomoredomains.monster',
  'https://www.api.mesto-akoroleva.nomoredomains.monster',
  'https://api.mesto-akoroleva.nomoredomains.monster',
  'http://www.api.mesto-akoroleva.nomoredomains.monster',
  'http://api.mesto-akoroleva.nomoredomains.monster',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  console.log(res);

  return next();
};

module.exports = { cors };
