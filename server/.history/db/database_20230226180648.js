const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  'Local Instance 3306',
  'root',
  'wlstjq039#',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

async function testConnection(){
  try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch(error){
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();