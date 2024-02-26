const db = require('../database/db')

module.exports = {
  // message_id,sender_id,receiver_id,message_text,message_timestamp,is_read
  getDirectMessages: (sender_id, receiver_id) => {
    return db.query(`SELECT *, (SELECT username FROM users WHERE id = messages.sender_id) FROM messages WHERE (sender_id=${sender_id} AND receiver_id=${receiver_id}) OR (sender_id=${receiver_id} AND receiver_id=${sender_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  postMessage: (sender_id, receiver_id, message_text, is_read) => {
    const queryString = `INSERT INTO messages ( sender_id, receiver_id, message_text, message_timestamp, is_read) VALUES ($1, $2, $3, $4, $5) RETURNING id`
    return db.query(queryString, [sender_id, receiver_id, message_text, Date.now(), is_read])
      .then((results) => {
        const { id } = results.rows[0];
        return id;
      })
      .catch((err) => {
        console.log(err)
      })
  },

};