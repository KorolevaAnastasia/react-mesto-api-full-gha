const express = require('express');
const mongoose = require('mongoose').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes');
const { handleError } = require('./errors/handleError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения:', error));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://www.mesto-akoroleva.nomoredomains.monster',
  'https://mesto-akoroleva.nomoredomains.monster',
  'http://www.mesto-akoroleva.nomoredomains.monster',
  'http://mesto-akoroleva.nomoredomains.monster',
  'https://www.api.mesto-akoroleva.nomoredomains.monster',
  'https://api.mesto-akoroleva.nomoredomains.monster',
  'http://www.api.mesto-akoroleva.nomoredomains.monster',
  'http://api.mesto-akoroleva.nomoredomains.monster',
];

const corsOptionsDelegate = {
  origin: allowedCors,
};

app.use(cors(corsOptionsDelegate));

app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
