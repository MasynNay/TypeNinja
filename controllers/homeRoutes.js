const router = require('express').Router();
const { User, Dictionary, Scores } = require('../models');
const session = require('express-session');
const withAuth = require('../utils/auth');

/*router.get('/', async (req, res) => {
  try {
    const DictionaryData = await Dictionary.findAll()
    const Dictionary = DictionaryData.map((Dictionary) => Dictionary.get({ plain: true }));
    res.render('homepage', { 
      Dictionary, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get('/', async (req, res) => {

  //const DictionaryData = await Dictionary.findAll()
  //const Dictionary = DictionaryData.map((Dictionary) => Dictionary.get({ plain: true }));
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

router.get('/dictionary', async (req, res) => {
  try {
    const DictionaryData = await Dictionary.findByPk(req.params.id, {
    });
    const Dictionary = DictionaryData.get({ plain: true });
    res.render('Dictionary', {
      ...Dictionary,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
