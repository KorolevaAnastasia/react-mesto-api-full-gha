const express = require('express');

const routes = express.Router();
const { celebrate, Joi } = require('celebrate');
const { NotFoundError } = require('../errors/NotFoundError');
const { regExp } = require('../utils/utils');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');

routes.all('*', express.json());

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routes.use('/users', auth, require('./users'));
routes.use('/cards', auth, require('./cards'));

routes.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { routes };
