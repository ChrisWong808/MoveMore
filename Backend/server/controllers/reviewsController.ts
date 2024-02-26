const models = require('../models');

module.exports = {
  getTrainerReviews: (req, res) => {
    models.reviewsModel.getTrainerReviews (req.params.trainer_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getClientReviews: (req, res) => {
    models.reviewsModel.getClientReviews (req.params.client_id)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  createTrainerReview: (req, res) => {
    models.reviewsModel.createTrainerReview(req.body.review_id, req.body.trainer_id, req.body.client_id, req.body.service_name, req.body.rating, req.body.review_text, req.body.review_date)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  createClientReview: (req, res) => {
    models.reviewsModel.createClientReview(req.body.review_id, req.body.trainer_id, req.body.client_id, req.body.service_name, req.body.rating, req.body.review_text, req.body.review_date)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },


}