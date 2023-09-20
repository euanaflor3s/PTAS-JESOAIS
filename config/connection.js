const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize(config.development);

try {
  sequelize.authenticate();
  console.log('Conectado  com o elephantSQL!');
} catch (error) {
  console.error('Conexão falhou:', error);
}

module.exports = { Sequelize, sequelize };