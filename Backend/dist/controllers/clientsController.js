"use strict";
var models = require('../models');
module.exports = {
    getClient: function (req, res) {
        models.clientsModel.getClient(req.params.account_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createClient: function (req, res) {
        models.clientsModel.createClient(req.body.client_id, req.body.account_id, req.body.location, req.body.tags, req.body.goals, req.body.contact_number, req.body.email, req.body.bio)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    editClient: function (req, res) {
        models.clientsModel.editClient(req.body.account_id, req.body.location, req.body.tags, req.body.goals, req.body.contact_number, req.body.email, req.body.bio)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
