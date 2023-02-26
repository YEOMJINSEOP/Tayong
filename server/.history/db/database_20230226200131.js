const { Sequelize, DataTypes } = require('sequelize');

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

const User = sequelize.define('users', {
  userId:{
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  profileImage:{
    type: DataTypes.STRING,
    allowNull: false
  },
  userName:{
    type:DataTypes.STRING,
    allowNull: false
  }},
  { timestamps: false }
)

async function testInsert(){
  const testUser = await User.create({
    userId: 'test123',
    profileImage: 'testProfileUrl456',
    userName: 'tesName789'
  });
  console.log('🔥', testUser);
}

testInsert();