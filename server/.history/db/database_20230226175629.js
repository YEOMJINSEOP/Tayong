const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  'tayong',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
