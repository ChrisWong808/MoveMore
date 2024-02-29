const models = require('../models');

module.exports = {
  getMessages: async (req, res) => {
    models.messages.getMessages(req.params.trainer_id, req.params.client_id)
      .then((directMessages) => {
        res.status(200).send(directMessages)
      })
      .catch((err) => {
        res.status(501).send(err)
      })
  },

  // for handling http request
  postMessage: (req, res) => {
    const { message, trainer_id, client_id } = req.body.message;
    models.messages.postMessage(message, trainer_id, client_id)
      .then(() => {
        res.status(201).send(req.body);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  //for internal request
  _postMessage: (newMessage) => {
    const { message, trainer_id, client_id, reply } = newMessage;
    let id;
    return models.messages.postMessage(message, trainer_id, client_id, reply)
      .then((res_id) => {
        id = res_id;
        return models.users.getUsername(trainer_id)
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