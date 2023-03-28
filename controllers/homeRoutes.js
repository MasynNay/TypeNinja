const router = require('express').Router();
const { Scores } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.render('game', {
      logged_in: req.session.logged_in 
    });
    
    return;
  }
  res.render('homepage', {
    logged_in: req.session.logged_in 
  });
 
});

router.get('/scores', withAuth, async (req, res) => {
  try {
    const scoreData = await Scores.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Scores }],
    });
    const Score = scoreData.get({ plain: true });
    res.render('scores', {
      ...Score,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/game');
    return;
  }

  res.render('login');
});


module.exports = router;
