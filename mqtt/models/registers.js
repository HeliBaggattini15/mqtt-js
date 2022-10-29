const Sequelize = require('sequelize');
const database = require('../database/db');

const registers = database.define('registers', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    register_time: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = registers;