const models = require('../models');

module.exports = {
  getClient: (req, res) => {
    models.clientsModel.getClient (req.params.account_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  createClient: (req, res) => {
    models.clientsModel.createClient(req.body.client_id, req.body.account_id, req.body.location, req.body.tags, req.body.goals, req.body.contact_number, req.body.email, req.body.bio)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  editClient: (req, res) => {
    models.clientsModel.editClient(req.body.account_id, req.body.location, req.body.tags, req.body.goals, req.body.contact_number, req.body.email, req.body.bio)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}