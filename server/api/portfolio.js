const router = require('express').Router();
const { Portfolio } = require('../db/models');

router.post('/:userID', async (req, res, next) => {
  try {
    const data = await Portfolio.create({
      symbol: req.body.symbol,
      quantity: req.body.quantity,
      userId: Number(req.params.userID)
    });

    res.status(201).send('Portfolio: row created');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
