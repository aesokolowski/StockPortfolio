const Sequelize = require('sequelize');
const db = require('../db');

const Portfolio = db.define('portfolio', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Portfolio;
