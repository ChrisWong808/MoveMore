"use strict";
var db = require('../database/db');
module.exports = {
    // payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id
    // payment_id,client_id,payment_amount,payment_date
    getTrainerPayment: function (trainer_id) {
        return db.query("SELECT * FROM trainer_payments WHERE trainer_id='".concat(trainer_id, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    getClientPayment: function (client_id) {
        return db.query("SELECT * FROM client_payments WHERE client_id='".concat(client_id, "'"))
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    createTrainerPayment: function (payment_id, trainer_id, payment_amount, payment_date, payment_method, transaction_id) {
        return db.query("INSERT INTO trainer_payments (payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id) VALUES ($1, $2, $3, $4, $5, $6)", [payment_id, trainer_id, payment_amount, payment_date, payment_method, transaction_id])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
    createClientPayment: function (payment_id, client_id, payment_amount, payment_date) {
        return db.query("INSERT INTO client_payments (payment_id,client_id,payment_amount,payment_date) VALUES ($1, $2, $3, $4)", [payment_id, client_id, payment_amount, payment_date])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            return err;
        });
    },
};
