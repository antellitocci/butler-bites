const router = require('express').Router();
<<<<<<< HEAD
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});
=======

const apiRoutes = require('./api/');

router.use('/api', apiRoutes);
>>>>>>> 97249d04497d7172f3828422dfee10e44425cc00

module.exports = router;