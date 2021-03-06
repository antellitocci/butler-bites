const router = require('express').Router();
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
                    'created_at'
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
            // WISHLIST
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
        // console.log(err);
        // console.log('-------------------------------');
        // console.log(err.parent.errno);
        // console.log('-------------------------------');
        // console.log(err.errors);
        // ERRNO 1062 IS A SEQUELIZE ERROR FOR DUPLICATE ENTRY && PATH IS THE DUPLICATE FIELD (EMAIL)
        if(err.parent.errno === 1062 && err.errors[0].path === 'user.email'){
            res.statusMessage = 'A user with this email address already exists. Please try logging in instead.';
            res.status(500);
        }
        // ERRNO 1062 IS A SEQUELIZE ERROR FOR DUPLICATE ENTRY && PATH IS THE DUPLICATE FIELD (USERNAME)
        else if(err.parent.errno === 1062 && err.errors[0].path === 'user.username'){
            res.statusMessage = 'A user with this username address already exists. Please choose a different username.';
            res.status(500);  
        }
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
            res.statusMessage = 'No user with that email address. Please verify you are using the correct email address associated with your account.';
            res.status(400).end();
            // res.status(400).json({ message: 'No user with that email address.' });
            return;
        }

        // VERIFY USER
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.statusMessage = 'Incorrect password. Please re-enter your password and try again.';
            res.status(400).end();
            // res.status(400).send('Incorrect password.');
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