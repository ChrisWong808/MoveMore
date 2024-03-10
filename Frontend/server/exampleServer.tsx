// const path = require('path');
// const express = require('express');
// const controllers = require('./controllers.js');
// const cloudinary = require('./cloudinary.js');
// const bodyParser = require('body-parser');
// const compression = require('compression');
// const fs = require('fs');
// const cors = require('cors');

// const app = express();

// const clientDirPath = path.resolve(__dirname, '../client/dist');

// const router = express.Router();

// router.use(cors());

// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false;
//   }
//   // fallback to standard filter function
//   return compression.filter(req, res);
// };

// app.use(compression({
//   level: 6,
//   threshold: 100 * 1000,
//   filter: shouldCompress }));

// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use(
//   bodyParser.urlencoded({
//     limit: '50mb',
//     extended: false,
//   })
// );
// app.use(
//   bodyParser.json({
//     limit: '50mb',
//   })
// );
// app.use(express.json());

// app.get('/products', (req, res) => {
//   controllers
//     .getProducts()
//     .then((results) => {
//       res.set('Cache-control', 'public, max-age=300');
//       res.status(201).send(results.data);
//       res.flush();
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//       res.flush();
//     });
// });

// app.get('/reviews', (req, res) => {
//   controllers
//     .getReviews(req.query.id, req.query.count, req.query.sort)
//     .then((results) => {
//       res.send(results.data).status(200);
//       res.flush();
//     })
//     .catch((err) => {
//       res.sendStatus(500);
//       res.flush();
//     });
// });

// app.get('/meta', (req, res) => {
//   controllers
//     .getMetaReview(req.query.id)
//     .then((results) => {
//       res.send(results.data).status(200);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//       res.flush();
//     });
// });

// app.put('/reviews', (req, res) => {
//   controllers
//     .putHelpfulReview(req.body.review_id)
//     .then((results) => {
//       res.send(results.data).status(200);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//       res.flush();
//     });
// });

// app.post('/reviews', (req, res) => {
//   // eslint-disable-next-line camelcase
//   let product_id = req.body.product_id;
//   let rating = req.body.rating;
//   let summary = req.body.summary;
//   let body = req.body.body;
//   let name = req.body.name;
//   let email = req.body.email;
//   let photos = req.body.photos;
//   let recommended = req.body.recommended;
//   let characteristics = req.body.characteristics;
//   controllers.postReview(
//     product_id,
//     rating,
//     summary,
//     body,
//     name,
//     email,
//     photos,
//     recommended,
//     characteristics
//   )
//     .then((results) => {
//       res.send(results.data).status(201);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(500);
//       res.flush();
//     });
// });

// //posts image to cloudinary and retrieves the cloudinary URL
// app.post('/cloudinary', (req, res) => {
//   var link = '';
//   cloudinary
//     .uploadImage(req.body.img, function (error, result) {
//       console.log(result, error);
//     })
//     .then((results) => {
//       link = results.url;
//       res.send(link);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//       res.flush();
//     });
// });



// app.use('/', router);

// router.get('/product/:product_id', controllers.getProduct);

// router.post('/cart', controllers.addToCart);

// router.get('/qa/questions/:question_id/answers', controllers.getAnswers);

// router.get('/qa/questions', controllers.getQuestions);

// router.put('/qa/questions/:question_id/helpful', controllers.markQasHelpful);

// router.put('/qa/questions/:question_id/report', controllers.reportQuestion);

// router.put('/qa/answers/:answer_id/helpful', controllers.markAasHelpful);

// router.put('/qa/answers/:answer_id/report', controllers.reportAnswer);

// router.post('/qa/questions', controllers.postQuestion);

// router.post('/qa/questions/:question_id/answers', controllers.postAnswer);

// app.listen(3000);
// console.log('Server listening at http://localhost:3000');