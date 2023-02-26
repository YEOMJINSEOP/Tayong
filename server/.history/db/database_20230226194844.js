const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'tayong',
  'root',
  'wlstjq039#',
  {
    host: '127.0.0.1',
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

const testMeet = await users_table.create({
  userId: 'testId123',
  profileImage: 'testProfileUrl123',
  userName: 'tesName'
});
console.log('🔥', testMeet);