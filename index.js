const express = require('express');
const connectDB = require('./config/database');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
const storesRouter = require('./src/routes/storesRouter')
const cors = require('cors')

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.envs/production.env' : './envs/development.env'
  });

connectDB();

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/pharm', storesRouter)


module.exports = app