const {
    DataTypes
} = require('sequelize');
const sequelize = require('../db');

// Definisikan model Todo
const Todo = sequelize.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Todo;