const router = require('express').Router();

const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipe-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/rating', ratingRoutes);

module.exports = router;