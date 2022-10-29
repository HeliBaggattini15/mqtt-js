const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://trigrsou:qHFuDpHLcbav13eb9G494CQpm7ETqUPb@babar.db.elephantsql.com/trigrsou', {dialect: 'postgres'});

module.exports = sequelize;