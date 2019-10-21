const express = require('express');

const multer = require('multer')
const UploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();

const upload = multer(UploadConfig);

//req.query
//req.params
//req.body

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

const mongoose = require('mongoose');
const serverStatus = () => {
  return { 
     state: 'up', 
     dbState: mongoose.STATES[mongoose.connection.readyState] 
  }
};

module.exports = routes;