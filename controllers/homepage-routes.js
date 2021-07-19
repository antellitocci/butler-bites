const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Rating, Category, Ingredient } = require('../models');

router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at',
            'prep_time',
            'cook_time'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
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
        res.render('homepage', {
            recipes,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// gets category recipes
router.get('/category/:id', (req, res) => {
    Recipe.findAll({
        where: {
            category_id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at',
            'prep_time',
            'cook_time'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Rating,
                attributes: ['score']
            },
            {
                model: Ingredient,
                attributes: ['name', 'measurement']
            }
        ]
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({ message: 'No recipes found in that category' });
            return;
        }
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain:true }));
        res.render('homepage', {
            recipes,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// gets specific recipe
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
            'ingredient_id',
            'directions'
        ],
        include: [
            {
                model: Ingredient,
                attributes: ['name', 'measurement']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
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
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;