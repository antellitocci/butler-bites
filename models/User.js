const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create the USER model
class User extends Model {
    //setup method to run on instance data per user to check password
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //specify a minimum of 8 characters long | think about adding validation for special characters, etc.
                len: [8]
            }
        }
    },
    {
        //Table config options go here (https://sequelize.org/v5/manual/models-definition.html#configuration)
        hooks:{
        //setup beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
        },
        //setup beforeUpdate lifecycle 'hook' functionality
        async beforeUpdate(updatedUserData){
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
        //pass imported sequelize connection(connection to database)
        sequelize,
        //don't auto create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel casing
        underscored: true,
        //make it so model stays lowercase in database
        modelName: 'user'  
    }
);

module.exports = User;