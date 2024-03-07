"use strict";
var db = require('../database/db');
module.exports = {
    // review_id,trainer_id,client_id,service_name,rating,review_text,review_date
    // review_id,trainer_id,client_id,service_name,rating,review_text,review_date
    getTrainerReviews: function (trainer_id) {
        return db.query("SELECT * FROM trainer_reviews WHERE trainer_id='".concat(trainer_id, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    getClientReviews: function (client_id) {
        return db.query("SELECT * FROM client_reviews WHERE client_id='".concat(client_id, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    createTrainerReview: function (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) {
        return db.query('INSERT INTO trainer_reviews (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [review_id, trainer_id, client_id, service_name, rating, review_text, review_date])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    createClientReview: function (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) {
        return db.query('INSERT INTO client_reviews (review_id, trainer_id, client_id, service_name, rating, review_text, review_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [review_id, trainer_id, client_id, service_name, rating, review_text, review_date])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
};
