const router = require('express').Router();
const { Scores } = require('../../models');
const withAuth = require('../../utils/auth');

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


router.put('/:id', withAuth, async (req, res) => {
  try {
    const scoreData = await Blog.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!scoreData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(scoreData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
