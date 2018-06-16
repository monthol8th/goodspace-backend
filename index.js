const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres@db:5432/ysttr');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
