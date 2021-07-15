const router = require('express').Router();

// const userRoutes = require('./user-routes');
<<<<<<< HEAD
const postRoutes = require('./recipe-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/users', userRoutes);
router.use('/recipes', postRoutes);
=======
const recipeRoutes = require('./recipe-routes');
// const commentRoutes = require('./comment-routes');

// router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
>>>>>>> 97249d04497d7172f3828422dfee10e44425cc00
// router.use('/comments', commentRoutes);

module.exports = router;