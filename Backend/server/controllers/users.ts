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

  // getFriends: (req, res) => {
  //   models.users.getFriends(req.params.user_id)
  //     .then((friends) => {
  //       res.status(200).send(friends);
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     })
  // },

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

  // addFriend: (req, res) => {
  //   models.users.addFriend(req.body.user_id, req.body.friend_id)
  //     .then(() => {
  //       res.status(201).send();
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     });
  // },

  // addFriendByUsername: (req, res) => {
  //   models.users.addFriendByUsername(req.body.server, req.body.username)
  //     .then(() => {
  //       res.status(201).send();
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     });
  // },
  // updateOnline: (req, res) => {
  //   models.users.updateOnline(req.params.user_id, req.body.online)
  //     .then(() => {
  //       res.status(201).send();
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     })
  // },

  // removeFriend: (req, res) => {
  //   models.users.removeFriend(req.body.user_id, req.body.friend_id)
  //     .then(() => {
  //       res.status(202).send();
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     })
  // },
}