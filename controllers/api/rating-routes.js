const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Rating } = require('../../models');


router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    Rating.create({
        score: req.body.score,
        user_id: req.session.user_id,
        recipe_id: req.body.id
    })
    .then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
        if(err.parent.errno === 1062){
            res.statusMessage = 'You have already rated this recipe!';
            res.status(500);
        }
        res.status(500).json(err);
    });
});

module.exports = router;