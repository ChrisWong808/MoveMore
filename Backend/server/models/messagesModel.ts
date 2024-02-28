const db = require('../database/db')

module.exports = {
  // message_id,sender_id,receiver_id,message_text,message_timestamp,is_read
  getDirectMessages: (trainer_id, client_id) => {
    return db.query(`SELECT *, (SELECT username FROM users WHERE id = messages.trainer_id) FROM messages WHERE (trainer_id=${trainer_id} AND client_id=${client_id}) OR (trainer_id=${client_id} AND client_id=${trainer_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  postMessage: (trainer_id, client_id, message_text, is_read) => {
    const queryString = `INSERT INTO messages ( trainer_id, client_id, message_text, message_timestamp, is_read) VALUES ($1, $2, $3, $4, $5) RETURNING id`
    return db.query(queryString, [trainer_id, client_id, message_text, Date.now(), is_read])
      .then((results) => {
        const { id } = results.rows[0];
        return id;
      })
      .catch((err) => {
        console.log(err)
      })
  },

};