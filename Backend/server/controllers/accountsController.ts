import { Request, Response } from 'express';
const models = require('../models');

module.exports = {
  getAccount: (req: Request, res: Response) => {
    models.accountsModel.getAccount (req.body.username, req.body.password)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      });
  },

  checkUsernameExistence: (req: Request, res: Response) => {
    const { username } = req.params;
    models.accountsModel.checkUsernameExistence(username)
      .then((exists: boolean) => {
        res.json({ exists });
      })
      .catch((err: any) => {
        console.error('Error checking username existence in controller:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },


  createAccount: (req: Request, res: Response) => {
    console.log('create account in Controller');
    models.accountsModel.createAccount({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      email: req.body.email
    })
      .then((response: any) => {
        res.status(201).send(response);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

  changeCurrentRole: (req: Request, res: Response) => {
    const { role, account_id } = req.body
    models.accountsModel.changeCurrentRole(role, account_id)
      .then((response: any) => {
        res.status(201).send(response);
      })
      .catch((err: any) => {
        res.status(501).send(err);
      })
  },

}