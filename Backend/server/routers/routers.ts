const router = require('express').Router();
const controllers = require('./controllers');

router.get('/users/:firebase_id', controllers.users.getUserId);

router.get('/directmessages/:user_id/:recipient_id', controllers.messages.getDirectMessages);

router.post('/users', controllers.users.createUser);

const accountsController = require('../controllers/accountsController');

router.get('/accounts/:id', accountsController.getAccountById);
router.post('/accounts', accountsController.createAccount);
router.put('/accounts/:id', accountsController.updateAccount);
router.delete('/accounts/:id', accountsController.deleteAccount);

const trainersController = require('../controllers/trainersController');

router.get('/trainers/:id', trainersController.getTrainerById);
router.post('/trainers', trainersController.createTrainer);
router.put('/trainers/:id', trainersController.updateTrainer);
router.delete('/trainers/:id', trainersController.deleteTrainer);

const clientsController = require('../controllers/clientsController');

router.get('/clients/:id', clientsController.getClientById);
router.post('/clients', clientsController.createClient);
router.put('/clients/:id', clientsController.updateClient);
router.delete('/clients/:id', clientsController.deleteClient);

const paymentsController = require('../controllers/paymentsController');

router.get('/payments/:id', paymentsController.getPaymentById);
router.post('/payments', paymentsController.createPayment);
// Add more routes for updating, deleting, or other payment-related operations

const reviewsController = require('../controllers/reviewsController');

router.get('/reviews/:id', reviewsController.getReviewById);
router.post('/reviews', reviewsController.createReview);
// Add more routes for updating, deleting, or other review-related operations

const servicesController = require('../controllers/servicesController');

router.get('/services/:id', servicesController.getServiceById);
router.post('/services', servicesController.createService);
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.deleteService);

const eventsController = require('../controllers/eventsController');

router.get('/events/:id', eventsController.getEventById);
router.post('/events', eventsController.createEvent);
router.put('/events/:id', eventsController.updateEvent);
router.delete('/events/:id', eventsController.deleteEvent);

const messagesController = require('../controllers/messagesController');

router.get('/messages/:id', messagesController.getMessageById);
router.post('/messages', messagesController.createMessage);
// Add more routes for updating, deleting, or other message-related operations



export default {router};

// router.get('/messages/:server_id/:channel_id', controllers.messages.getMessages);

// router.get('/servers/:user_id', controllers.servers.getServers);

// router.get('/server/:server_id/users', controllers.servers.getUsersInServer);

// router.get('/channels/:server_id', controllers.channels.getChannels);

// router.get('/friends/:user_id', controllers.users.getFriends);

// router.post('/servers', controllers.servers.createServer);

// router.post('/servers/:server_id/', controllers.servers.inviteUser);

// router.post('/channels', controllers.channels.createChannel);

// router.post('/friends', controllers.users.addFriend);

// router.post('/friends/username', controllers.users.addFriendByUsername);

// router.delete('/friends', controllers.users.removeFriend);

// router.delete('/servers/:server_id', controllers.servers.deleteServer);

// router.delete('/channels/:channel_id', controllers.channels.deleteChannel);

// router.put('/users/:user_id', controllers.users.updateOnline);

// router.put('/servers/:server_id', controllers.servers.renameServer);

// router.put('/channels/:channel_id', controllers.channels.renameChannel);

