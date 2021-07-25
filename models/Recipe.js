const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {
    // static rate(body, models){
    //     return models.Rating.create({
    //         user_id: body.user_id,
    //         recipe_id: body.recipe_id
    //     })
    //     .then(() => {
    //         return Recipe.findOne({
    //             where: {
    //                 id: body.recipe_id
    //             },
    //             attributes: [
    //                 'id',
    //                 'title',
    //                 'created at',
    //                 [sequelize.literal('(SELECT AVG(score) FROM rating WHERE recipe_id = recipe.id)'), 'average_rating']
    //             ]
    //         });
    //     });
    // }
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
            type: DataTypes.STRING,
            allowNull: false,
            //return the stored value as an array
            get() {
                return this.getDataValue('ingredients').split(',');
            }
        },
        directions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
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