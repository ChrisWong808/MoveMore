const models = require('../models');

module.exports = {
  getUpcomingEventsByTrainerId: (req, res) => {
    models.eventsModel.getUpcomingEventsByTrainerId (req.params.trainer_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getUpcomingEventsByClientId: (req, res) => {
    models.eventsModel.getUpcomingEventsByClientId (req.params.client_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  createEvent: (req, res) => {
    models.eventsModel.createEvent(req.body.event_id, req.body.service_id, req.body.trainer_id, req.body.client_id, req.body.event_timestamp, req.body.notes)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  rescheduleEvent: (req, res) => {
    models.eventsModel.rescheduleEvent(req.body.event_id, req.body.event_timestamp)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}