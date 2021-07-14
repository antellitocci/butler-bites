const { Recipe } = require('../models');

const recipeData = [
    {
        title: 'Sausage Burgers',
        user_id: 1,
        category_id: 3,
        prep_time: '10 minutes',
        cook_time: '20 minutes',
        serving_size: '2-4 people',
        ingredients: '1 lb ground beef, 1 lb Jimmy Dean ground sausage, 2 Tbsp Worcestershire, 2 hits seasoning salt',
        directions: 'Mix ingredients by hand in a large bowl. After satisfied with mix, begin to create burger patties out of the mix. This recipe usually yields 6 burgers. After creating the burgers, grill the patties for 18-20 minutes while flipping every 4-5 minutes.'
    },
    {
        title: 'Ham Sandwich',
        user_id: 2,
        category_id: 2,
        prep_time: '3 minutes',
        cook_time: '0 minutes',
        serving_size: '1 person',
        ingredients: '2 pieces of preferred bread, 5 slices of deli ham, 2 slices of Swiss cheese, 1 slice of iceberge lettuce, 1 massive squirt of mustard',
        directions: 'Place the slices of ham on one piece of the bread, place the cheese on top of the ham, squirt the mustard on the cheese, top with the lettuce and close the sandwich by placing the other piece of bread on top of the lettuce.'
    },
    {
        title: 'Cereal',
        user_id: 3,
        category_id: 1,
        prep_time: '2 minutes',
        cook_time: '0 minutes',
        serving_size: '1 person',
        ingredients: '1 cup whole milk, 1 cup of your favorite cereal',
        directions: 'Pour the cup of your favorite cereal into your favorite bowl then pour the milk into the bowl with the cereal. Serve with a spoon.'
    },
    {
        title: 'Ice Cream Sandwich',
        user_id: 4,
        category_id: 4,
        prep_time: '0 minutes',
        cook_time: '0 minutes',
        serving_size: '1 person',
        ingredients: '1 ice cream sandwich',
        directions: 'Open freezer. Retrieve ice cream sandwich. Unwrap and eat.'
    }

];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;