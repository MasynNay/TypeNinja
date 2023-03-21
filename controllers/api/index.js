const router = require('express').Router();
const userRoutes = require('./userRoutes');
const scoresRoutes = require('./scoresRoutes');
const dictionaryRoutes = require('./dictionaryRoutes');

router.use('/users', userRoutes);
router.use('/scores', scoresRoutes);
router.use('/dictionary', dictionaryRoutes);

module.exports = router;
