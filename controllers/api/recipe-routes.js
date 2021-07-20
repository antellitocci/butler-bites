const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, Category, User, Comment, Rating  } = require('../../models');
const withAuth = require('../../utils/auth');

// get all recipes
router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            // [sequelize.literal('(SELECT AVG(*) FROM rating WHERE recipe_id = rating.recipe_id)'), 'average_rating']
        ],
        include: [
            {
                model: Category
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one recipe
router.get('/:id', (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            // [sequelize.literal('(SELECT AVG(*) FROM rating WHERE recipe_id = rating.recipe_id'), 'average_rating']
        ],
        include: [
            {
                model: Category
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        if(!dbRecipeData) {
            res.status(404).json({ message: 'No recipe found with this id' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create new recipe
router.post('/', withAuth, (req, res) => {
    Recipe.create({
        title: req.body.title,
        user_id: req.session.user_id,
        category_id: req.body.category_id,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        serving_size: req.body.serving_size,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update recipe
router.put('/:id', withAuth, (req, res) => {
    Recipe.update(
        {
            title: req.body.title,
            user_id: req.session.user_id,
            category_id: req.body.category_id,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            serving_size: req.body.serving_size,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete recipe
router.delete('/:id', withAuth, (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe with that id found' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;