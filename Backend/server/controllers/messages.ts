const models = require('../models');

module.exports = {
  getMessages: (req, res) => {
    models.messages.getMessages(req.params.server_id, req.params.channel_id)
      .then((messages) => {
        res.status(200).send(messages);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getDirectMessages: async (req, res) => {
    // Verify the user's JWT token
    // try {
    //   // Use the uid from the decoded token to retrieve the user's private data from other db
    //   // const userId = await models.users.getUserIdFromFirebaseId(req.headers.firebase_id);

    //   models.messages.getDirectMessages(req.params.user_id, req.params.recipient_id)
    //     .then((directMessages) => {
    //       res.status(200).send(directMessages)
    //     })
    //     .catch((err) => {
    //       res.status(501).send(err)
    //     })

    // } catch (error) {
    //   res.status(401).send('Unauthorized');
    // }
    models.messages.getDirectMessages(req.params.user_id, req.params.recipient_id)
      .then((directMessages) => {
        res.status(200).send(directMessages)
      })
      .catch((err) => {
        res.status(501).send(err)
      })
  },

  // postMessage: (req, res) => {
  //   const { message, server_id, channel_id, user_id, recipient_id } = req.body.message;
  //   models.messages.postMessage(message, server_id, channel_id, user_id, recipient_id)
  //     .then(() => {
  //       res.status(201).send(req.body);
  //     })
  //     .catch((err) => {
  //       res.status(501).send(err);
  //     });
  // },

  // _postMessage: (newMessage) => {
  //   const { message, server_id, channel_id, user_id, recipient_id, reply } = newMessage;
  //   let id;
  //   return models.messages.postMessage(message, server_id, channel_id, user_id, recipient_id, reply)
  //     .then((res_id) => {
  //       id = res_id;
  //       return models.users.getUsername(user_id)
  //         .then((result) => {
  //           let obj = {...newMessage, id: id, username: result, created_at: Date.now()};
  //           return obj;
  //         })
  //         .catch(() => {
  //           console.log(err);
  //           return err;
  //         })

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return err;
  //     });
  // }

}