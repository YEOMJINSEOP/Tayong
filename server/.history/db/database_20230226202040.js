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

const Meet = sequelize.define('meets', {
  meetId:{
    type: DataTypes.STRING,
    primaryKey:true,
    allowNull: false
  },
  departure:{
    type: DataTypes.STRING,
    allowNull: false
  },
  arrival:{
    type: DataTypes.STRING,
    allowNull: false
  },
  host:{
    type: DataTypes.STRING,
    allowNull: false
  },
  meetDate:{
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  meetTime:{
    type: DataTypes.TIME,
    allowNull: false
  },
  recruitment:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transport:{
    type: DataTypes.STRING,
    allowNull: false
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false
  },
  content:{
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export async function createUserData(userId, name, imageUrl){
  const newUser = await User.create({
    userId: 'test123',
    profileImage: 'testProfileUrl456',
    userName: 'tesName789'
  });
  console.log('🔥', newUser);
};

async function createMeetData(meet){
  const {meetId, host, departure, arrival, meetTime, recruitment, participant, transport, title, content } = meet;
};

async function testMeet(){
  const testMeet = await Meet.create({
    meetID: 'test',
    departure: 'testDeparture',
    arrival: 'testArrival',
    host: 'testHost',
    meetDate: '2022-02-11',
    meetTime: '11:00',
    recruitment: 4,
    transport: '택시',
    title: 'testTitle',
    content: 'testContent'
  });
  console.log('🔥', testMeet);
};