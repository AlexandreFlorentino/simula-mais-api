const Joi = require('joi');

const registerSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  objetivo: Joi.string().valid('ENEM', 'CONCURSO', 'VESTIBULAR', 'OUTRO').required(),
  grauEscolar: Joi.string().valid('ENSINO_MEDIO', 'GRADUACAO', 'POS_GRADUACAO'),
  dataNascimento: Joi.date()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };