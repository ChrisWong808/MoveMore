const db = require('../database/db')

module.exports = {
  // message_id,sender_id,receiver_id,message_text,message_timestamp,is_read
  getDirectMessages: (user_id, recipient_id) => {
    return db.query(`SELECT *, (SELECT username FROM users WHERE id = messages.user_id) FROM messages WHERE (user_id=${user_id} AND recipient_id=${recipient_id}) OR (user_id=${recipient_id} AND recipient_id=${user_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  postMessage: (message, user_id, recipient_id, reply) => {
    const queryString = `INSERT INTO messages (message, user_id, recipient_id, created_at, reply) VALUES ($1, $2, $3, $4, $5) RETURNING id`
    return db.query(queryString, [message, user_id, recipient_id, Date.now(), reply])
      .then((results) => {
        const { id } = results.rows[0];
        return id;
      })
      .catch((err) => {
        console.log(err)
      })
  },

};