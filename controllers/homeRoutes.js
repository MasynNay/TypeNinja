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
    res.redirect('/dashboard');
    return;
  }
  res.render('homepage');
 
});

router.get('/Dictionary/:id', async (req, res) => {
  try {
    const DictionaryData = await Dictionary.findByPk(req.params.id, {
      include: [
        {
          model: User, include: {
            attributes: ['id', 'username'],
          }
        },
        {
          model: Scores, include: {
            model: User, 
            attributes: ['id', 'username'],
          }
        }
      ],
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dictionary }],
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
