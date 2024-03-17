import { Request, Response } from 'express';
const models = require('../models');

module.exports = {
  getTrainerReviews: (req: Request, res: Response) => {
    models.reviewsModel.getTrainerReviews (req.params.trainer_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },

  getClientReviews: (req: Request, res: Response) => {
    models.reviewsModel.getClientReviews (req.params.client_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },

  createTrainerReview: (req: Request, res: Response) => {
    console.log('createTrainerReview Req.body in Controller', req.body)
    models.reviewsModel.createTrainerReview({
      trainer_id: req.body.trainer_id,
      client_id: req.body.client_id,
      service_name: req.body.service_name,
      rating: req.body.rating,
      review_text: req.body.review_text,
      review_date: req.body.review_date
    })
      .then((result: any) => {
        res.status(201).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

  createClientReview: (req: Request, res: Response) => {
    models.reviewsModel.createClientReview({
      trainer_id: req.body.trainer_id,
      client_id: req.body.client_id,
      service_name: req.body.service_name,
      rating: req.body.rating,
      review_text: req.body.review_text,
      review_date: req.body.review_date
    })
      .then((result: any) => {
        res.status(201).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },


}