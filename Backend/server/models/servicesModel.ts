const db = require('../database/db');

module.exports = {
  // service_id, trainer_id, activity, difficulty, cost, duration, location, description
  getServices: (trainer_id) => {
    return db.query(`SELECT * FROM services WHERE trainer_id='${trainer_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createService: (service_id, trainer_id, activity, difficulty, cost, duration, location, description) => {
    return db.query(
      'INSERT INTO services (service_id, trainer_id, activity, difficulty, cost, duration, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [client_id, account_id, location, tags, goals, contact_number, email, bio]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  editService: (service_id, trainer_id, activity, difficulty, cost, duration, location, description) => {
    return db.query(
      'UPDATE services SET activity = $3, difficulty = $4, cost = $5, duration = $6, location = $7, description = $8 WHERE account_id = $1',
      [service_id, trainer_id, activity, difficulty, cost, duration, location, description]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  deleteService: (service_id) => {
    return db.query(
      `DELETE FROM services WHERE service_id='${service_id}'`
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

}