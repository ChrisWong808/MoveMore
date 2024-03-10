// /* eslint-disable camelcase */
// const axios = require('axios');
// require('dotenv').config();

// const client = axios.create({
//   baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': process.env.TOKEN
//   }
// });

// let getProducts = () => {
//   return (client.get('/products'));
// };

// let getProduct = (req, res) => {
//   let productId = req.params.product_id;

//   client.get(`products/${productId}`)
//     .then((product) => {
//       client.get(`/products/${productId}/styles`)
//         .then((styles) => {
//           var result = { productInfo: product.data, styleInfo: styles.data };
//           res.set('Cache-control', 'public, max-age=300');
//           res.status(200).send(result);
//           res.flush();
//         })
//         .catch(stylesErr => {
//           res.status(500).send(stylesErr);
//           res.flush();
//         });
//     })
//     .catch(err => {
//       res.status(500).send(err);
//       res.flush();
//     });
// };

// let addToCart = (req, res) => {
//   let skuId = req.body.data;
//   client.post('/cart', skuId)
//     .then(() => {
//       res.sendStatus(201);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error adding to cart');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let getReviews = (id, count, sort) => {
//   return (client.get(`/reviews/?product_id=${id}&count=${count}&sort=${sort}`));
// };

// let getMetaReview = (id, page) => {
//   return (client.get(`/reviews/meta?product_id=${id}`));
// };


// let putHelpfulReview = (review_id) => {

//   return (client.put(`/reviews/${review_id}/helpful`));
// };


// let postReview = (product_id, rating, summary, body, name, email, photos, recommended, characteristics) => {

//   let data = {
//     'product_id': product_id,
//     'rating': rating,
//     'summary': summary,
//     'body': body,
//     'recommend': recommended,
//     'name': name,
//     'email': email,
//     'photos': photos,
//     'characteristics': characteristics
//   };
//   return (client.post('/reviews', data));
// };

// // returns first ${count} number of questions that contains filter term, sorted by helpfulness
// let getQuestions = (req, res) => {
//   let params = req.query;
//   let id = params.id;
//   let count = params.count;
//   let filter = params.filter || '';

//   // can update to include filter for answers too
//   client.get(`/qa/questions/?product_id=${id}&count=100`)
//     .then((result) => {
//       // keep the questions with filter term
//       let filtered = result.data.results.filter((question) => {
//         return question.question_body.toLowerCase().includes(filter);
//       });
//       // sort by descending helpfulness
//       filtered.sort((a, b) => {
//         return b.question_helpfulness - a.question_helpfulness;
//       });
//       // slice off the first ${count} number of questions
//       res.status(200).send(filtered.slice(0, count));
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error getting questions');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let getAnswers = (req, res) => {
//   let questionId = req.params.question_id;
//   let count = req.query.count;
//   let sellerName = req.query.sellerName.toLowerCase() || '';

//   client.get(`/qa/questions/${questionId}/answers?count=${count}`)
//     .then((result) => {
//       let answers = result.data.results;
//       // sort by descending helpfulness
//       answers.sort((a, b) => {
//         // seller answers should be at top
//         if (a.answerer_name.toLowerCase() === sellerName && b.answerer_name.toLowerCase() === sellerName) {
//           return b.question_helpfulness - a.question_helpfulness;
//         } else if (a.answerer_name.toLowerCase() === sellerName) {
//           return -1;
//         } else if (b.answerer_name.toLowerCase() === sellerName) {
//           return 1;
//         } else {
//           return b.question_helpfulness - a.question_helpfulness;
//         }
//       });
//       res.status(200).send(answers);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error getting answers');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let markQasHelpful = (req, res) => {
//   let questionId = req.params.question_id;
//   client.put(`/qa/questions/${questionId}/helpful`)
//     .then(() => {
//       res.sendStatus(204);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error marking question as helpful');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let reportQuestion = (req, res) => {
//   let questionId = req.params.question_id;
//   client.put(`/qa/questions/${questionId}/report`)
//     .then(() => {
//       res.sendStatus(204);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error reporting question');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let markAasHelpful = (req, res) => {
//   let answerId = req.params.answer_id;
//   client.put(`/qa/answers/${answerId}/helpful`)
//     .then(() => {
//       res.sendStatus(204);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error marking answer as helpful');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let reportAnswer = (req, res) => {
//   let answerId = req.params.answer_id;
//   client.put(`/qa/answers/${answerId}/report`)
//     .then(() => {
//       res.sendStatus(204);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error reporting answer');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let postQuestion = (req, res) => {
//   let question = req.body.data;
//   client.post('/qa/questions', question)
//     .then(() => {
//       res.sendStatus(201);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error posting question: ', err);
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// let postAnswer = (req, res) => {
//   let questionId = req.params.question_id;
//   let answer = req.body.data;
//   client.post(`/qa/questions/${questionId}/answers`, answer)
//     .then(() => {
//       res.sendStatus(201);
//       res.flush();
//     })
//     .catch((err) => {
//       console.log('server error posting answer');
//       res.sendStatus(500);
//       res.flush();
//     });
// };

// module.exports.getProducts = getProducts;
// module.exports.getProduct = getProduct;
// module.exports.addToCart = addToCart;
// module.exports.getReviews = getReviews;
// module.exports.getQuestions = getQuestions;
// module.exports.getAnswers = getAnswers;
// module.exports.markQasHelpful = markQasHelpful;
// module.exports.reportQuestion = reportQuestion;
// module.exports.markAasHelpful = markAasHelpful;
// module.exports.reportAnswer = reportAnswer;
// module.exports.postQuestion = postQuestion;
// module.exports.postAnswer = postAnswer;
// module.exports.getMetaReview = getMetaReview;
// module.exports.putHelpfulReview = putHelpfulReview;
// module.exports.postReview = postReview;