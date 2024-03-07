"use strict";
var models = require('../models');
module.exports = {
    getAccount: function (req, res) {
        models.accountsModel.getAccount(req.params.username)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    // create will need username, password, is_trainer BOOLEAN, is_client BOOLEAN, first_name, last_name, phone_number
    // might need to add an edit to update boolean from false to true, if change password as well every Q months
    createAccount: function (req, res) {
        console.log('create account');
        models.accountsModel.createAccount(req.body.username, req.body.password, req.body.currentRole, req.body.first_name, req.body.last_name, req.body.phone_number)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    changeCurrentRole: function (req, res) {
        models.accountsModel.changeCurrentRole(req.body.currentRole, req.body.username)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
