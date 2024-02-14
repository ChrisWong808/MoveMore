const db = require('../database/db');

module.exports = {
  // payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id
  // payment_id,client_id,payment_amount,payment_date

  getTrainerPayment: (trainer_id) => {
    return db.query(`SELECT * FROM trainer_payments WHERE trainer_id='${trainer_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  getClientPayment: (client_id) => {
    return db.query(`SELECT * FROM client_payments WHERE client_id='${client_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createTrainerPayment: (payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id) => {
    return db.query(`INSERT INTO trainer_payments (payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id) VALUES ($1, $2, $3, $4, $5, $6)`, [payment_id,trainer_id,payment_amount,payment_date,payment_method,transaction_id])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createClientPayment: (payment_id,client_id,payment_amount,payment_date) => {
    return db.query(`INSERT INTO client_payments (payment_id,client_id,payment_amount,payment_date) VALUES ($1, $2, $3, $4)`, [payment_id,client_id,payment_amount,payment_date])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

}