import { Request, Response } from 'express';

//for the getFilteredTrainers when i transform CardServices need to define function above
const formatCardServices = (rawCardServices: any[]) => {
  const cardServices = [];
  for (let i = 0; i < rawCardServices.length; i += 2) {
    const activity = rawCardServices[i];
    const cost = parseFloat(rawCardServices[i + 1]);
    cardServices.push(activity, cost);
  }
  return cardServices;
};

const models = require('../models');

module.exports = {
  // getTrainer: (req: Request, res: Response) => {
  //   models.trainersModel.getTrainer(req.params.trainer_id)
  //     .then((result: any) => {
  //       res.status(200).send(result);
  //     })
  //     .catch((err: any) => {
  //       res.status(501).send(err);
  //     });
  // },
  getTrainer: (req: Request, res: Response) => {
    models.trainersModel.getTrainer(req.params.account_id)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },
  // getFilteredTrainers: async (req, res) => {
  //   try {
  //     const { distanceFilter, activityFilter, costFilter, client_id } = req.query;

  //     // Call the model to get filtered trainers
  //     const filteredTrainers = await models.trainersModel.getFilteredTrainers(
  //       client_id,
  //       distanceFilter,
  //       activityFilter,
  //       costFilter
  //     );

  //     // Transform the result to match the desired format
  //     const transformedTrainers = await Promise.all(filteredTrainers.map(async (trainer) => {
  //       return {
  //         trainer_id: trainer.trainer_id,
  //         // CardPic: image[0]
  //         CardName: `${trainer.first_name} ${trainer.last_name}`,
  //         CardAvgRate: trainer.avg_rating,
  //         CardNumReviews: trainer.num_reviews,
  //         CardServices: formatCardServices(trainer.card_services),
  //         DistanceAway: trainer.distance_in_meters,
  //       };
  //     }));

  //     res.status(200).json(transformedTrainers);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // },

  // createTrainer: (req: Request, res: Response) => {
  //   console.log('Create Trainer method called in Controller');
  //   models.trainersModel.createTrainer(req.body.account_id, req.body.location, req.body.tags, req.body.equipment, req.body.credentials, req.body.socials, req.body.bio)
  //     .then((response: any) => {
  //       res.status(201).send(response);
  //     })
  //     .catch((err: any) => {
  //       res.status(501).send(err);
  //     });
  // },

  createTrainer: (req: Request, res: Response) => {
    console.log('Create Trainer method called in Controller');
    models.trainersModel.createTrainer({
      account_id: req.body.account_id,
      location: req.body.location,
      tags: req.body.tags,
      equipment: req.body.equipment,
      credentials: req.body.credentials,
      socials: req.body.socials,
      bio: req.body.bio
    })
    .then((response: any) => {
      res.status(201).send(response);
    })
    .catch((err: any) => {
      res.status(501).send(err);
    });
  },

  editTrainer: (req: Request, res: Response) => {
    const { trainer_id, location, tags, equipment, credentials, socials, bio } = req.body;
    models.trainersModel.editTrainer(trainer_id, location, tags, equipment, credentials, socials, bio)
      .then((response: any) => {
        res.status(201).send(response);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },
};