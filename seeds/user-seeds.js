const { User } = require('../models');

const userData = [
    {
        username: 'Sausage Sally',
        email: 'sally@example.com',
        password: 'howitsmade123'
    },
    {
        username: 'Harry Hogge',
        email: 'harry@hoggefarms.com',
        password: 'baconisg00d123'
    },
    {
        username: 'Captain Crunch',
        email: 'capn@arrr.com',
        password: 'shivermetimbers123'
    },
    {
        username: 'Benjamin Jerry',
        email:'bennjerry@test.com',
        password: 'funkymonk3y123'
    },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;