const models = require('../models');

module.exports = {
  getTrainerPayment: (req, res) => {
    models.paymentsModel.getTrainerPayment (req.params.trainer_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getClientPayment: (req, res) => {
    models.paymentsModel.getClientPayment (req.params.client_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },


  createTrainerPayment: (req, res) => {
    models.paymentsModel.createTrainerPayment(req.body.payment_id, req.body.trainer_id, req.body.payment_amount, req.body.payment_date, req.body.payment_method, req.body.transaction_id)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  createClientPayment: (req, res) => {
    models.paymentsModel.createClientPayment(req.body.payment_id, req.body.client_id, req.body.payment_amount, req.body.payment_date)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}