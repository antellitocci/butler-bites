const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        measurement: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ingredient'
    }
);

module.exports = Ingredient;