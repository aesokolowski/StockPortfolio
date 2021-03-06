const router = require('express').Router();
const { Transaction } = require('../db/models');

router.post('/:userID', async (req, res, next) => {
  try {
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
