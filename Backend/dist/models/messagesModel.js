"use strict";
var db = require('../database/db');
module.exports = {
    // message_id,sender_id,receiver_id,message_text,message_timestamp,is_read
    getMessages: function (trainer_id, client_id) {
        return db.query("SELECT *, (SELECT username FROM users WHERE id = messages.trainer_id) FROM messages WHERE (trainer_id=".concat(trainer_id, " AND client_id=").concat(client_id, ") OR (trainer_id=").concat(client_id, " AND client_id=").concat(trainer_id, ")"))
            .then(function (result) {
            return result.rows;
        })
            .catch(function (err) {
            return err;
        });
    },
    postMessage: function (trainer_id, client_id, message_text, is_read) {
        var queryString = "INSERT INTO messages ( trainer_id, client_id, message_text, message_timestamp, is_read) VALUES ($1, $2, $3, $4, $5) RETURNING id";
        return db.query(queryString, [trainer_id, client_id, message_text, Date.now(), is_read])
            .then(function (results) {
            var id = results.rows[0].id;
            return id;
        })
            .catch(function (err) {
            console.log(err);
        });
    },
};
