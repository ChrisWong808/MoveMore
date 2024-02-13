const db = require('../database/db');

module.exports = {
  getUserId: (firebase_id) => {
    return db.query(`SELECT id, username FROM users WHERE firebase_id='${firebase_id}'`)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return err;
      });
  },

  // getFriends: (user_id) => {
  //   return db.query(`SELECT id, username, online FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id=${user_id})`)
  //     .then((result) => {
  //       return result.rows;
  //     })
  //     .catch((err) => {
  //       return err;
  //     })
  // },

  createUser: (username, firebase_id) => {
    const queryString = `INSERT INTO users (username, firebase_id) VALUES ($1, $2) RETURNING id`

    return db.query(queryString, [username, firebase_id])
      .then((result) => {
        return db.query(`INSERT INTO servers_users (user_id, server_id) VALUES ($1, $2)`, [result.rows[0].id, 1])
        return result.rows[0];
      })
      .catch((err) => {
        return err;
      })
  },

  // addFriendByUsername: (user_id, friendUsername) => {
  //   // const queryString = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)`
  //   const queryString = `
  //   INSERT INTO friends (user_id, friend_id)
  //   VALUES ($1, (
  //     SELECT id FROM users WHERE username = $2)), ((SELECT id FROM users WHERE username = $2), $1)`;
  //   return db.query(queryString, [user_id, friendUsername])
  //     .catch((err) => {
  //       console.log('error adding friend by username: ', err.message);
  //       return err;
  //     });
  // },

  // addFriend: (user_id, friend_id) => {
  //   const queryString = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2), ($2, $1)`

  //   return db.query(queryString, [user_id, friend_id])
  //     .catch((err) => {
  //       console.log('error adding friend: ', err.message);
  //       return err;
  //     } )
  // },

  // removeFriend: (user_id, friend_id) => {
  //   const queryString = 'DELETE FROM friends WHERE user_id IN ($1, $2) AND friend_id IN ($1, $2)';

  //   return db.query(queryString, [user_id, friend_id])
  //     .catch((err) => {
  //       console.log('error removing friend: ', err.message);
  //       return err;
  //     });
  // },

  getUserIdFromFirebaseId: (firebaseId) => {
    return db.query(`SELECT id FROM users WHERE firebase_id='${firebaseId}'`)
      .then(result => {
        return result.rows[0].firebase_id;
      })
      .catch(err => {
        return err;
      })
  },
  getUsername: (id) => {
    return db.query(`SELECT username FROM users WHERE id='${id}'`)
      .then((result) => {
        return result.rows[0].username;
      })
      .catch((err) => {
        return err;
      });
  },
  // updateOnline: (user_id, onlineStatus) => {
  //   return db.query(`UPDATE users SET online = ${onlineStatus} WHERE id=${user_id}`)
  //     .catch((err) => {
  //       return err;
  //     })
  // }
}