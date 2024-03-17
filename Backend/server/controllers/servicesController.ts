import { Request, Response } from 'express';
const models = require('../models');

module.exports = {
  getServices: (req: Request, res: Response) => {
    models.servicesModel.getServices (req.params.trainer_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },


  createService: (req: Request, res: Response) => {
    models.servicesModel.createService({
      trainer_id: req.body.trainer_id,
      activity: req.body.activity,
      difficulty: req.body.difficulty,
      cost: req.body.cost,
      duration: req.body.duration,
      location: req.body.location,
      description: req.body.description
    })
      .then((result: any) => {
        res.status(201).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

  editService: (req: Request, res: Response) => {
    const service_id: number = parseInt(req.params.service_id); // Parse the service_id from the route URL
    models.servicesModel.editService(service_id, {
      trainer_id: req.body.trainer_id,
      activity: req.body.activity,
      difficulty: req.body.difficulty,
      cost: req.body.cost,
      duration: req.body.duration,
      location: req.body.location,
      description: req.body.description
    })
    .then((result: any) => {
      res.status(201).send(result);
    })
    .catch((err: any) => {
      res.status(501).send(err);
    });
  },

  deleteService: (req: Request, res: Response) => {
    models.servicesModel.deleteService (req.params.service_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },
}