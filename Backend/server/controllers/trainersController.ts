const models = require('../models');

module.exports = {
  getTrainer: (req, res) => {
    models.trainersModel.getTrainer (req.params.account_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },


  createTrainer: (req, res) => {
    models.trainersModel.createTrainer(req.body.trainer_id, req.body.account_id, req.body.location, req.body.tags, req.body.equipment, req.body.credentials, req.body.socials, req.body.bio)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  editTrainer: (req, res) => {
    models.trainersModel.editTrainer(req.body.trainer_id, req.body.account_id, req.body.location, req.body.tags, req.body.equipment, req.body.credentials, req.body.socials, req.body.bio)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}