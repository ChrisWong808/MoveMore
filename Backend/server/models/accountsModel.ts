const db = require('../database/db');

module.exports = {

  // username, password, is_trainer BOOLEAN, is_client BOOLEAN, first_name, last_name, phone_number
  // might need to add an edit to update boolean from false to true, if change password as well every Q months
  // maybe change DB booleans true/false to just role
  getAccount: (username) => {
    return db.query(`SELECT * FROM accounts WHERE username='${username}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createAccount: (username, password, currentRole, first_name, last_name, phone_number) => {
    return db.query(
      // `INSERT INTO accounts (username, password, is_trainer, is_client, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7)`
      'INSERT INTO accounts (username, password, currentRole, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [username, password, currentRole, first_name, last_name, phone_number]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  changeCurrentRole: (currentRole, username) => {
    return db.query(`UPDATE accounts SET role = '${currentRole}' WHERE username = '${username}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },
}