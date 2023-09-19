const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize(  
  "postgres://wgahajso:c9YemqzAKK5OIrxEUrdI5R4s09IDqwI1@motty.db.elephantsql.com/wgahajso" {
    define: {
      timestamps: true,
      underscored: true,
    },
  });

try {
  sequelize.authenticate();
  console.log('Conectado  com o elephantSQL!');
} catch (error) {
  console.error('Conexão falhou:', error);
}

module.exports = { Sequelize, sequelize };