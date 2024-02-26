const models = require('../models');

module.exports = {
  getAccount: (req, res) => {
    models.accountsModel.getAccount (req.params.username)
      .then((res) => {
        res.status(200).send(res);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  // create will need username, password, is_trainer BOOLEAN, is_client BOOLEAN, first_name, last_name, phone_number
  // might need to add an edit to update boolean from false to true, if change password as well every Q months

  createAccount: (req, res) => {
    console.log('create account');
    models.accountsModel.createAccount(req.body.username, req.body.password, req.body.currentRole, req.body.first_name, req.body.last_name, req.body.phone_number)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  changeCurrentRole: (req, res) => {
    models.accountsModel.changeCurrentRole(req.body.currentRole, req.body.username)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}