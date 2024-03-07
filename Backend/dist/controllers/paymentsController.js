"use strict";
var models = require('../models');
module.exports = {
    getTrainerPayment: function (req, res) {
        models.paymentsModel.getTrainerPayment(req.params.trainer_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    getClientPayment: function (req, res) {
        models.paymentsModel.getClientPayment(req.params.client_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createTrainerPayment: function (req, res) {
        models.paymentsModel.createTrainerPayment(req.body.payment_id, req.body.trainer_id, req.body.payment_amount, req.body.payment_date, req.body.payment_method, req.body.transaction_id)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createClientPayment: function (req, res) {
        models.paymentsModel.createClientPayment(req.body.payment_id, req.body.client_id, req.body.payment_amount, req.body.payment_date)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
