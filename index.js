const express = require('express');
const connectDB = require('./config/database');
const app = express();
const databaseController = require('./src/controllers/databaseContro');
const morgan = require('morgan')
const dotenv = require('dotenv')
const storesRouter = require('./src/routes/storesRouter')
const cors = require('cors')

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? './main.env' : './main.env'
  });

connectDB();
app.get('/check-database-access', databaseController.checkDatabaseAccess);

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', storesRouter)
const orderRouter = require('./src/routes/orderRouter');
app.use('/api', orderRouter);


module.exports = app