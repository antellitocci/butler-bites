const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Rating, Category, Ingredient } = require('../models');

// router.get('/', (req, res) =>{
//     res.render('homepage');
// })


router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at',
            'prep_time',
            'cook_time',
            'serving_size',
            'ingredients',
            'directions',
            'image'
        ],
        order: [ ['created_at', 'DESC'] ],
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
        console.log(recipes);
        res.render('homepage', {
            recipes,
            loggedIn: req.session.loggedIn,
            username: req.session.username //testing to see if we can display username
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
            'cook_time',
            'serving_size',
            'ingredients',
            'directions',
            'image'
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
        if(!dbRecipeData) {
            res.status(404).json({ message: 'No recipes found in that category' });
            return;
        }
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain:true }));
        const category = dbRecipeData[0].category.category_name;
        res.render('category', {
            recipes,
            category,
            loggedIn: req.session.loggedIn,
            username: req.session.username
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
            'ingredients',
            'directions',
            'created_at',
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
        console.log(recipe);
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

// GET | sign-up page rendering
router.get('/signup', (req, res) => {
    // IF THE USER IS ALREADY LOGGED IN, REDIRECT TO HOMEPAGE
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    // SHOW REGISTER PAGE OTHERWISE
    res.render('signup');
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