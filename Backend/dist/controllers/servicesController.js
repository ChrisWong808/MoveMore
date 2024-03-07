"use strict";
var models = require('../models');
module.exports = {
    getServices: function (req, res) {
        models.servicesModel.getServices(req.params.trainer_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createService: function (req, res) {
        models.servicesModel.createService(req.body.service_id, req.body.trainer_id, req.body.activity, req.body.difficulty, req.body.cost, req.body.duration, req.body.location, req.body.description)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    editService: function (req, res) {
        models.servicesModel.editService(req.params.service_id, req.params.trainer_id, req.params.activity, req.params.difficulty, req.params.cost, req.params.duration, req.params.location, req.params.description)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    deleteService: function (req, res) {
        models.servicesModel.deleteService(req.params.service_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
