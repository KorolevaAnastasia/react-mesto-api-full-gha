const express = require('express');
const mongoose = require('mongoose').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const { PORT = 3000 } = process.env;
const { routes } = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения:', error));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use(cors());

app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
