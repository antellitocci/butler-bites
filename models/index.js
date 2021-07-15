const User = require('./User');
const Recipe = require('./Recipe');
const Rating = require('./Rating');
const Comment = require('./Comment');
const Category = require('./Category');

//create assoications between tables
//A user can post many recipes
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

//A recipe can only be written by one user
Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

//A user can rate many recipes
//Creates associations between users and recipes rated
User.belongsToMany(Recipe, {
    through: Rating,
    as: 'rated_recipes',
    foreignKey: 'user_id'
});

Recipe.belongsToMany(User, {
    through: Rating,
    as: 'rated_recipes',
    foreignKey: 'recipe_id'
});

Rating.belongsTo(User, {
    foreignKey: 'user_id'
});

Rating.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

User.hasMany(Rating, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Rating, {
    foreignKey: 'recipe_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id'
});

Category.hasMany(Recipe, {
    foreignKey: 'recipe_id'
});

module.exports = { User, Recipe, Rating, Comment, Category };