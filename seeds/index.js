const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedRecipes = require('./recipe-seeds');
const seedRatings = require('./rating-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');
    await seedRecipes();
    console.log('\n----- RECIPES SEEDED -----\n');
    await seedRatings();
    console.log('\n----- RATINGS SEEDED -----\n');

    process.exit(0);
};

seedAll();
