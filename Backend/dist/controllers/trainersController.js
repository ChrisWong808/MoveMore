"use strict";
//for the getFilteredTrainers when i transform CardServices need to define function above
var formatCardServices = function (rawCardServices) {
    var cardServices = [];
    for (var i = 0; i < rawCardServices.length; i += 2) {
        var activity = rawCardServices[i];
        var cost = parseFloat(rawCardServices[i + 1]);
        cardServices.push(activity, cost);
    }
    return cardServices;
};
var models = require('../models');
module.exports = {
    getTrainer: function (req, res) {
        models.trainersModel.getTrainer(req.params.trainer_id)
            .then(function (res) {
            res.status(200).send(res);
        })
            .catch(function (err) {
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
    createTrainer: function (req, res) {
        models.trainersModel.createTrainer(req.body.trainer_id, req.body.account_id, req.body.location, req.body.tags, req.body.equipment, req.body.credentials, req.body.socials, req.body.bio)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
    editTrainer: function (req, res) {
        models.trainersModel.editTrainer(req.body.trainer_id, req.body.account_id, req.body.location, req.body.tags, req.body.equipment, req.body.credentials, req.body.socials, req.body.bio)
            .then(function (response) {
            res.status(201).send(response);
        })
            .catch(function (err) {
            res.status(501).send(err);
        });
    },
};
