const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {   // Number of shares purchased
    type: Sequelize.INTEGER,
    allowNull: false
  },
  boughtAt: {   // Purchase price in cents
    type: Sequelize.INTEGER,
    allowNull: false
  },
  transTotal: {  // Transaction total, in cents
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Transaction;
