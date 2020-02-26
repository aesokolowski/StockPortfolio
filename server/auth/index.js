const router = require('express').Router();
const User = require('../db/models/user');
const Transaction = require('../db/models/transaction');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//  update proper User.funds field on the backend:
router.put('/me/funds/', async (req, res, next) => {
  console.log('req.body.newFunds', req.body.newFunds);
  console.log('req.user.id:', req.user.id);
  try {
    const data = await User.update({
      funds: req.body.newFunds
    },
    {
      where: {
        id: req.user.id
      }
    });

    res.json(data);
  } catch (e) {
    next(e);
  }
});

//  in determining whether a user can afford an action, I'd
//  prefer to get the funds from the backend rather than rely on
//  the frontend store data
router.get('/me/funds', async (req, res, next) => {
  try {
    const data = await User.findByPk(req.user.id, {
      attributes: ['funds']
    });

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/me/transactions', async (req, res, next) => {
  try {
    const data = await User.findByPk(req.user.id, {
      transactions: {
        where: {
          userId: req.user.id
        },
        attributes: [
          'symbol',
          'companyName',
          'quantity',
          'boughtAt',
          'transTotal',
          'createdAt'
        ]
      },
      include: [{ model: Transaction }]
    });

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.get('/me/uid', async (req, res, next) => {
  res.json(req.user.id);
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
