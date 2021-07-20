const { Rating } = require('../models');

const ratingData = [
    {
        score: 3,
        user_id: 1,
        recipe_id: 1
    },
    {
        score: 5,
        user_id: 2,
        recipe_id: 1
    },
    {
        score: 4,
        user_id: 3,
        recipe_id: 1
    },
    {
        score: 5,
        user_id: 4,
        recipe_id: 1
    },
    {
        score: 2,
        user_id: 1,
        recipe_id: 2
    },
    {
        score: 3,
        user_id: 2,
        recipe_id: 2
    },
    {
        score: 2,
        user_id: 3,
        recipe_id: 2
    },
    {
        score: 1,
        user_id: 4,
        recipe_id: 2
    },
    {
        score: 1,
        user_id: 1,
        recipe_id: 3
    },
    {
        score: 1,
        user_id: 2,
        recipe_id: 3
    },
    {
        score: 1,
        user_id: 3,
        recipe_id: 3
    },
    {
        score: 1,
        user_id: 4,
        recipe_id: 3
    },
    {
        score: 5,
        user_id: 1,
        recipe_id: 4
    },
    {
        score: 3,
        user_id: 2,
        recipe_id: 4
    },
    {
        score: 5,
        user_id: 3,
        recipe_id: 4
    },
    {
        score: 4,
        user_id: 4,
        recipe_id: 4
    },
];

const seedRatings = () => Rating.bulkCreate(ratingData);

module.exports = seedRatings;