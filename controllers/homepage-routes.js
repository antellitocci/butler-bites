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
            'directions'
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
            'cook_time',
            'serving_size',
            'ingredients',
            'directions'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Rating,
                attributes: [[sequelize.fn('AVG', sequelize.col('score')), 'average_score']],
                group: 'recipe_id'
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
        // let ingredientArr = [];
        // dbRecipeData.forEach(element => ingredientArr.push(element.ingredients.split(',')));
        // const ingredient_list = ingredientArr.flat();
        // console.log(ingredient_list);
        const category = dbRecipeData[0].category.category_name;
        console.log(category);
        console.log(recipes);
        res.render('category', {
            recipes,
            category,
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
            'ingredients',
            'directions'
        ],
        include: [
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});

module.exports = router;