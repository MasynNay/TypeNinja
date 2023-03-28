const router = require('express').Router();
const { Scores } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const scoresData = await Scores.findAll({
      include: [
        {
          model: Scores,
          attributes: ['score'],
        },
      ],
    });
    res.status(200).json(scoresData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newScore = await Scores.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newScore);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
