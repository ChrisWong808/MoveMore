const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({
  user: process.env.USERNAME || '',
  // database: process.env.DBNAME,
  database: 'api',
  password: process.env.PASSWORD,
  host: '127.0.0.1',
  port: 5432,
});

interface Connection {
  pool: any; // Adjust the type accordingly
  query: (...args: any[]) => Promise<any[]>; // Adjust the type accordingly
}

const connection: Connection = {
  pool,
  query: (...args: any[]) => {
    return pool.connect().then((client: any) => {
      return client.query(...args).then((res: any) => {
        client.release();
        return res.rows;
      });
    });
  },
};

// const connection = {
//   pool: any,
//   query: (...args) => {
//     return pool.connect().then((client) => {
//       return client.query(...args).then((res) => {
//         client.release();
//         return res.rows;
//       });
//     });
//   },
// };

module.exports = connection;
// module.exports = pool;