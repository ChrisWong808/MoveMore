"use strict";
var models = require('../models');
module.exports = {
    getUpcomingEventsByTrainerId: function (req, res) {
        models.eventsModel.getUpcomingEventsByTrainerId(req.params.trainer_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    getUpcomingEventsByClientId: function (req, res) {
        models.eventsModel.getUpcomingEventsByClientId(req.params.client_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    createEvent: function (req, res) {
        models.eventsModel.createEvent(req.body.event_id, req.body.service_id, req.body.trainer_id, req.body.client_id, req.body.event_timestamp, req.body.notes)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    rescheduleEvent: function (req, res) {
        models.eventsModel.rescheduleEvent(req.body.event_id, req.body.event_timestamp)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
