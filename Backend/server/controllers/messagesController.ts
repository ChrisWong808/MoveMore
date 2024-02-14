const models = require('../models');

module.exports = {
  getDirectMessages: async (req, res) => {
    models.messages.getDirectMessages(req.params.user_id, req.params.recipient_id)
      .then((directMessages) => {
        res.status(200).send(directMessages)
      })
      .catch((err) => {
        res.status(501).send(err)
      })
  },

  // idk the diff between these 2 post messages
  postMessage: (req, res) => {
    const { message, user_id, recipient_id } = req.body.message;
    models.messages.postMessage(message, user_id, recipient_id)
      .then(() => {
        res.status(201).send(req.body);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  _postMessage: (newMessage) => {
    const { message, user_id, recipient_id, reply } = newMessage;
    let id;
    return models.messages.postMessage(message, user_id, recipient_id, reply)
      .then((res_id) => {
        id = res_id;
        return models.users.getUsername(user_id)
          .then((result) => {
            let obj = {...newMessage, id: id, username: result, created_at: Date.now()};
            return obj;
          })
          .catch(() => {
            console.log(err);
            return err;
          })

      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}