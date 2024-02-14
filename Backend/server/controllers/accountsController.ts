const models = require('../models');

module.exports = {
  getUserId: (req, res) => {
    models.users.getUserId (req.params.firebase_id)
      .then((userId) => {
        res.status(200).send(userId);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  // create will need username, password, is_trainer BOOLEAN, is_client BOOLEAN, first_name, last_name, phone_number
  // might need to add an edit to update boolean from false to true, if change password as well every Q months

  createUser: (req, res) => {
    console.log('create user');
    models.users.createUser(req.body.username, req.body.firebase_id)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },
}