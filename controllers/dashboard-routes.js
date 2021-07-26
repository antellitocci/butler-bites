const router = require('express').Router();
const { Recipe, User, Comment, Rating, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Recipe.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at',
            'prep_time',
            'cook_time',
            'image'
        ],
        order: [ ['created_at', 'DESC'] ],
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Rating,
                attributes: ['score']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbRecipeData => {
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain:true }));
        res.render('dashboard', {
            recipes,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/recipe/:id', (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'category_id',
            'prep_time',
            'cook_time',
            'serving_size',
            'ingredients',
            'directions',
            'image'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Rating,
                attributes: ['score']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        const recipe = dbRecipeData.get({ plain: true });
        res.render('single-recipe', {
            recipe,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//  edit recipe
router.get('/edit-recipe/:id', withAuth, (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'category_id',
            'prep_time',
            'cook_time',
            'serving_size',
            'ingredients',
            'directions',
            'image'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Rating,
                attributes: ['score']
            },
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        const recipe = dbRecipeData.get({ plain: true });
        res.render('edit-recipe', {
            recipe,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new-recipe', (req, res) => {
    if(!req.session.loggedIn){
        res.redirect('/login');
        return;
    }
    
    res.render('new-recipe', {
        loggedIn: req.session.loggedIn,
        username: req.session.username
    });
});

module.exports = router;