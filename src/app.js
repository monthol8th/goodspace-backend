import routes from './routes';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

db.sequelize.sync();


// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

app.use('/', routes);

export default app;