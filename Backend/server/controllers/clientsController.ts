import { Request, Response } from 'express';
const models = require('../models');

module.exports = {
  // getClient: (req: Request, res: Response) => {
  //   models.clientsModel.getClient (req.params.client_id)
  //     .then((result: any) => {
  //       res.status(200).send(result);
  //     })
  //     .catch((err: any) => {
  //       res.status(501).send(err);
  //     });
  // },
  getClient: (req: Request, res: Response) => {
    models.clientsModel.getClient (req.params.account_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },

  createClient: (req: Request, res: Response) => {
    models.clientsModel.createClient({
      account_id: req.body.account_id,
      location: req.body.location,
      tags: req.body.tags,
      goals: req.body.goals,
      bio: req.body.bio
    })
      .then((response: any) => {
        res.status(201).send(response);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

  editClient: (req: Request, res: Response) => {
    const { client_id, location, tags, goals, bio } = req.body;
    models.clientsModel.editClient(client_id, location, tags, goals, bio)
      .then((response: any) => {
        res.status(201).send(response);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

}