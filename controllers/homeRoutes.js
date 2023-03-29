const router = require('express').Router();
const { User, Dictionary, Scores } = require('../models');
const session = require('express-session');
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

//GK ADDED 3/28/2023 to retrive list of scores
router.get('/scores', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const scoreData = await Scores.findAll({
      order: [
        ['score', 'DESC']
      ],
  });

    // Serialize data so the template can read it
    const scores = scoreData.map((scores) => scores.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('scores', { 
      scores, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



/*code that existed before gk changes 3/28/2023


router.get('/scores', withAuth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      return res.render('scores', {
        logged_in: req.session.logged_in 
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});*/

    // const scoreData = await Scores.findByPk(req.session.user_id,
    //    {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Scores }],
    // });
    // const Score = scoreData.get({ plain: true });
    // res.render('scores', {
    //   ...Score,
    //   logged_in: true
    // });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/game');
    return;
  }

  res.render('login');
});


module.exports = router;
