"use strict";
var models = require('../models');
module.exports = {
    getTrainerReviews: function (req, res) {
        models.reviewsModel.getTrainerReviews(req.params.trainer_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    getClientReviews: function (req, res) {
        models.reviewsModel.getClientReviews(req.params.client_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createTrainerReview: function (req, res) {
        models.reviewsModel.createTrainerReview(req.body.review_id, req.body.trainer_id, req.body.client_id, req.body.service_name, req.body.rating, req.body.review_text, req.body.review_date)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createClientReview: function (req, res) {
        models.reviewsModel.createClientReview(req.body.review_id, req.body.trainer_id, req.body.client_id, req.body.service_name, req.body.rating, req.body.review_text, req.body.review_date)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
