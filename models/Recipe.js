// do text columns for ingredients and directions
// I forewent an image column for the time being
// Ingredient and direction columns are simply text fields at the moment. Ideally, these would link to any number of child tables, but for MVP we're not doing this yet.
// Cook time will also be a simple varchar(20)

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {
    static rate(body, models){
        return models.Rating.create({
            user_id: body.user_id,
            recipe_id: body.recipe_id
        })
        .then(() => {
            return Recipe.findOne({
                where: {
                    id: body.recipe_id
                },
                attributes: [
                    'id',
                    'title',
                    'created at',
                    [sequelize.literal('(SELECT AVG(score) FROM rating WHERE recipe_id = recipe.id)'), 'average_rating']
                ]
            });
        });
    }
}

//create columns for Recipe table
Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(35),
            allowNull: false,
            validate: {
                //title must be at least 5 characters long
                len: [5]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        prep_time: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cook_time: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        serving_size: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        ingredients: {
            type: DataTypes.ARRAY,
            allowNull: false
        },
        directions: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe'
    }
);

module.exports = Recipe;