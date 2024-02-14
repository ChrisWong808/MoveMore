const db = require('../database/db');

module.exports = {
  // client_id,account_id,location,tags,goals,contact_number,email,bio
  getClient: (account_id) => {
    return db.query(`SELECT * FROM clients WHERE account_id='${account_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createClient: (client_id,account_id,location,tags,goals,contact_number,email,bio) => {
    return db.query(
      // `INSERT INTO clients (client_id,account_id,location,tags,goals,contact_number,email,bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
      'INSERT INTO clients (client_id, account_id, location, tags, goals, contact_number, email, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [client_id, account_id, location, tags, goals, contact_number, email, bio]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  editClient: (account_id,location,tags,goals,contact_number,email,bio) => {
    return db.query(
      // `UPDATE clients SET role = '${location}', tags = '${tags}', goals = '${goals}', contact_number = '${contact_number}', email = '${email}', bio = '${bio}'  WHERE account_id = '${account_id}'`
      'UPDATE clients SET location = $1, tags = $2, goals = $3, contact_number = $4, email = $5, bio = $6 WHERE account_id = $7',
      [location, tags, goals, contact_number, email, bio, account_id]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

}