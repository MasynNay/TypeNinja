const router = require('express').Router();
const userRoutes = require('./userRoutes');
const scoresRoutes = require('./scoresRoutes');
const randomWordsRoute = require('./randomWordsRoute');

router.use('/users', userRoutes);
router.use('/scores', scoresRoutes);
router.use('/randomWordsRoute', randomWordsRoute);

module.exports = router;
