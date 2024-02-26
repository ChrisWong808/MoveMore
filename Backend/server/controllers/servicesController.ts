const models = require('../models');

module.exports = {
  getServices: (req, res) => {
    models.servicesModel.getServices (req.params.trainer_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },


  createService: (req, res) => {
    models.servicesModel.createService(req.body.service_id, req.body.trainer_id, req.body.activity, req.body.difficulty, req.body.cost, req.body.duration, req.body.location, req.body.description)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  editService: (req, res) => {
    models.servicesModel.editService(req.params.service_id, req.params.trainer_id, req.params.activity, req.params.difficulty, req.params.cost, req.params.duration, req.params.location, req.params.description)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  deleteService: (req, res) => {
    models.servicesModel.deleteService (req.params.service_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },
}