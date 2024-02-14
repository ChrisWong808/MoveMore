const db = require('../database/db');

module.exports = {
  // i think i add filters here for client home to get trainer cards
  // trainer_id, account_id, location, tags, equipment, credentials, socials, bio
  getTrainer: (account_id) => {
    return db.query(`SELECT * FROM trainers WHERE account_id='${account_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createTrainer: (trainer_id, account_id, location, tags, equipment, credentials, socials, bio) => {
    return db.query(
      'INSERT INTO trainers (trainer_id, account_id, location, tags, equipment, credentials, socials, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [trainer_id, account_id, location, tags, equipment, credentials, socials, bio]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  editTrainer: (trainer_id, account_id, location, tags, equipment, credentials, socials, bio) => {
    return db.query(
      'UPDATE clients SET location = $1, tags = $2, equipment = $3, credentials = $4, socials = $5, bio = $6 WHERE account_id = $7',
      [location, tags, equipment, credentials, socials, bio, account_id, ]
      )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

}