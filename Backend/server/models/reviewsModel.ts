const db = require('../database/db');

module.exports = {
  // review_id,trainer_id,client_id,service_name,rating,review_text,review_date
  // review_id,trainer_id,client_id,service_name,rating,review_text,review_date

  getTrainerReviews: (trainer_id) => {
    return db.query(`SELECT * FROM trainer_reviews WHERE trainer_id='${trainer_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  getClientReviews: (client_id) => {
    return db.query(`SELECT * FROM client_reviews WHERE client_id='${client_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createTrainerReview: (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) => {
    return db.query(
      'INSERT INTO trainer_reviews (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [review_id, trainer_id, client_id, service_name, rating, review_text, review_date]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createClientReview: (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) => {
    return db.query(
      'INSERT INTO client_reviews (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [review_id, trainer_id, client_id, service_name, rating, review_text, review_date]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },



}