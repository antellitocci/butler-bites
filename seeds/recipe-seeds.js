const { Recipe } = require('../models');

const recipeData = [
    {
        title: 'Sausage Burgers',
        user_id: 1,
        category_id: 3,
        prep_time: '10',
        cook_time: '20',
        serving_size: '2-4 people',
        ingredients: '1 lb ground beef, 1 lb Jimmy Dean ground sausage, 2 Tbsp Worcestershire, 2 hits seasoning salt',
        directions: 'Mix ingredients by hand in a large bowl. After satisfied with mix, begin to create burger patties out of the mix. This recipe usually yields 6 burgers. After creating the burgers, grill the patties for 18-20 minutes while flipping every 4-5 minutes.',
        image: '/images/burgers.jpg'
    },
    {
        title: 'Ham Sandwich',
        user_id: 2,
        category_id: 2,
        prep_time: '3',
        cook_time: '0',
        serving_size: '1',
        ingredients: '2 pieces of preferred bread, 5 slices of deli ham, 2 slices of Swiss cheese, 1 slice of iceberge lettuce, 1 massive squirt of mustard',
        directions: 'Place the slices of ham on one piece of the bread, place the cheese on top of the ham, squirt the mustard on the cheese, top with the lettuce and close the sandwich by placing the other piece of bread on top of the lettuce.',
        image: '/images/ham-sandwich.jpg'
    },
    {
        title: 'Cereal',
        user_id: 3,
        category_id: 1,
        prep_time: '2',
        cook_time: '0',
        serving_size: '1',
        ingredients: '1 cup whole milk, 1 cup of your favorite cereal',
        directions: 'Pour the cup of your favorite cereal into your favorite bowl then pour the milk into the bowl with the cereal. Serve with a spoon.',
        image: '/images/cereal.jpg'
    },
    {
        title: 'Ice Cream Sandwich',
        user_id: 4,
        category_id: 4,
        prep_time: '0',
        cook_time: '0',
        serving_size: '1',
        ingredients: '1 ice cream sandwich',
        directions: 'Open freezer. Retrieve ice cream sandwich. Unwrap and eat.',
        image: '/images/recipe-placeholder.jpg'
    },
    {
        title: "Uncle Sal's Famous Sirloin",
        user_id: 4,
        category_id: 3,
        prep_time: '15',
        cook_time: '20',
        serving_size: '2',
        ingredients: '2 sirloin steaks, 6 pinches salt, 6 pinches pepper, 2 pinch garlic powder, 2 Tbsp butter',
        directions: 'Light your grill. While the grill is warming up, sprinkle your salt, pepper, and garlic powder over each steak. Each ingredient should be halved per steak (i.e., 3 pinches of salt per steak). Once your grill is ready, place the steaks on the grill. Cook for 20 minutes, flipping every 5 minutes. During the last minute or so, plop 1 Tbsp of butter on the top of each steak. Do not flip again. After the 20 minutes have elapsed, your steaks are ready to enjoy. Eat up!',
        image: '/images/steak.jpg'        
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;