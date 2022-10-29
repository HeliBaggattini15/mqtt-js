const Sequelize = require('sequelize');
const database = require('../database/db');

const users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    rfid: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    deleted_at: {
        type: Sequelize.STRING,
    },
    remember_token: {
        type: Sequelize.STRING,
    }
},
{
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = users;