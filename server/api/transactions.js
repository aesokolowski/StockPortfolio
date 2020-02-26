const router = require('express').Router();
const { Transaction, User } = require('../db/models');

router.post('/:userID', async (req, res, next) => {
  try {
    console.log('req.params.userID:', req.params.userID);
    console.log('typeof req.params.userID', typeof req.params.userID);

    const price = req.body.boughtAt;
    const qty = req.body.quantity;
    const total = price * qty;
    const id = Number(req.params.userID);
    const data = await Transaction.create({
      symbol: req.body.symbol,
      companyName: req.body.companyName,
      quantity: qty,
      boughtAt: price,
      transTotal: price * qty,
      userId: id
    });

    res.status(201).send('Transactions: row created');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
