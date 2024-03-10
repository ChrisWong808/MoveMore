// Change the export in routers.ts to use ES6 syntax:
// const router = require('express').Router();

import express from 'express';
const router = express.Router();
// const controllers = require('./controllers');

const accountsController = require('../controllers/accountsController');

router.get('/accounts', accountsController.getAccount);
router.post('/accounts', accountsController.createAccount);
router.put('/accounts/:account_id', accountsController.changeCurrentRole);
// // router.delete('/accounts/:account_id', accountsController.deleteAccount);

const trainersController = require('../controllers/trainersController');

//general searching multiple trainers
// router.get('/trainers', trainersController.getFilteredTrainers);
//search for specific trainer
router.get('/trainers/:trainer_id', trainersController.getTrainer);
router.post('/trainers', trainersController.createTrainer);
router.put('/trainers/:trainer_id', trainersController.editTrainer);
// router.delete('/trainers/:trainer_id', trainersController.deleteTrainer);

const clientsController = require('../controllers/clientsController');

router.get('/clients/:client_id', clientsController.getClient);
router.post('/clients', clientsController.createClient);
router.put('/clients/:client_id', clientsController.editClient);
// // router.delete('/clients/:client_id', clientsController.deleteClient);

// const paymentsController = require('../controllers/paymentsController');

// router.get('/payments/trainer/:trainer_id', paymentsController.getTrainerPayment);
// router.get('/payments/client/:client_id', paymentsController.getClientPayment);
// router.post('/payments/trainer/:trainer_id', paymentsController.createTrainerPayment);
// router.post('/payments/client/:client_id', paymentsController.createClientPayment);

// const reviewsController = require('../controllers/reviewsController');

// router.get('/reviews/trainer/:trainer_id', reviewsController.getTrainerReviews);
// router.get('/reviews/client/:client_id', reviewsController.getClientReviews);
// router.post('/reviews/trainer/:trainer_id', reviewsController.createTrainerReview);
// router.post('/reviews/client/:client_id', reviewsController.createClientReview);


// const servicesController = require('../controllers/servicesController');

// router.get('/services/:trainer_id', servicesController.getServices);
// router.post('/services/:trainer_id', servicesController.createService);
// router.put('/services/:trainer_id', servicesController.editService);
// router.delete('/services/:trainer_id', servicesController.deleteService);

// const eventsController = require('../controllers/eventsController');

// router.get('/events', eventsController.getUpcomingEventsByTrainerId);
// router.get('/events', eventsController.getUpcomingEventsByClientId);
// router.post('/events', eventsController.createEvent);
// router.put('/events', eventsController.rescheduleEvent);
// // router.delete('/events/:id', eventsController.deleteEvent);

// const messagesController = require('../controllers/messagesController');

// router.get('/messages/:trainer_id/:client_id', messagesController.getMessages);
// router.post('/messages/:trainer_id/:client_id', messagesController.postMessage);
// // Add more routes for updating, deleting, or other message-related operations

// export default {router};
export default router;