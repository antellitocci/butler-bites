const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { User, Recipe, Rating, Comment } = require('../../models');

//GET /api/users | ALL USERS
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET api/users/:id | GET A SINGLE USER
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Recipe,
                attributes: [
                    'id', 
                    'title', 
                    'created_at',
                    //will need to double check this actually works 
                    [sequelize.literal('(SELECT AVG(score) FROM rating WHERE recipe_id = recipe.id)'), 'average_rating']
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id', 
                    'comment_text', 
                    'created_at'
                ],
                include: {
                    model: Recipe,
                    attributes: ['title']
                }
            }
            // Once figured out how we are rating posts, we can re-enable this
            // ,
            // {
            //     model: Recipe,
            //     attributes: ['title'],
            //     through: Rating,
            //     as: 'rated_posts'
            // }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST /api/users | CREATE A NEW USER
router.post('/', (req, res) => {
    //expects { username: 'string', email: 'string', password: 'string'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// LOGIN VERIFICATION
router.post('/login', (req, res) => {
    //expects { email: 'string', password: 'string'}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({ message: 'No user with that email address.' });
            return;
        }

        // VERIFY USER
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect password.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in.' });
        });
    });
});

//PUT /api/users/:id | UPDATE A USER
// LIKELY TO BE FLESHED OUT MORE
router.put('/:id', (req, res) => {
    //expects { username: 'string', email: 'string', password: 'string' }
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500),json(err);
    });
});

//DELETE /api/users/:id | DELETE A USER
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//HANDLE USER LOGOUT
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;