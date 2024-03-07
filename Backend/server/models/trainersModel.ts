import { Request, Response } from 'express';
const db = require('../../database');

interface Trainer {
  trainer_id: number;
  account_id: number;
  location: any;
  tags: string[];
  equipment: string[];
  credentials: string[];
  socials: string[];
  bio: string;
}

module.exports = {
  getTrainer: (trainer_id: number): Promise<Trainer> => {
    return db.query(`SELECT * FROM trainers WHERE trainer_id = $1`, [trainer_id])
      .then((result: Trainer[]) => {
        return result[0]; // Assuming you want to return a single trainer
      })
      .catch((err: any) => {
        throw err;
      });
  },

  // getFilteredTrainers: async (client_id, distanceFilter, activityFilter, costFilter) => {
  //   try {
  //     // Fetch the client's location
  //     const clientLocationResult = await db.query('SELECT location FROM clients WHERE client_id = $1', [client_id]);

  //     // Extract the Point geometry from the result
  //     const clientLocation = clientLocationResult.rows[0].location;

  //     // Perform your SQL query with JOINs and filtering
  //     //WHERE ST_Distance(t.location::geography, $2::geography) <= $3 is the filter part and $3 is the distanceFilter that is < or =
  //     const result = await db.query(`
  //       SELECT
  //         t.*,
  //         a.first_name,
  //         a.last_name,
  //         c.location AS client_location,
  //         ST_Distance(t.location::geography, $2::geography) AS distance_in_meters
  //         COALESCE(AVG(r.rating), 0) AS avg_rating,
  //         COUNT(r.rating) AS num_reviews,
  //         ARRAY_AGG(s.activity) || ARRAY_AGG(s.cost::text) AS card_services
  //       FROM trainers t
  //       JOIN accounts a ON t.account_id = a.account_id
  //       JOIN clients c ON t.account_id = c.account_id
  //       LEFT JOIN trainer_reviews r ON t.trainer_id = r.trainer_id
  //       LEFT JOIN services s ON t.trainer_id = s.trainer_id
  //       -- Add other JOINs and conditions based on your data model
  //       WHERE
  //         ST_Distance(t.location::geography, $2::geography) <= $3 AND
  //         EXISTS (
  //           SELECT 1
  //           FROM services s
  //           WHERE
  //             s.trainer_id = t.trainer_id AND
  //             s.activity = ANY($4)
  //         ) AND
  //         EXISTS (
  //           SELECT 1
  //           FROM services s
  //           WHERE
  //             s.trainer_id = t.trainer_id AND
  //             s.cost <= $5
  //         )
  //         GROUP BY t.trainer_id, a.first_name, a.last_name, c.location; -- Group by to calculate AVG and COUNT
  //     `, [client_id, clientLocation, distanceFilter, activityFilter, costFilter]);

  //     return result.rows;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  createTrainer: (trainer: Trainer): Promise<any> => {
    const { trainer_id, account_id, location, tags, equipment, credentials, socials, bio } = trainer;
    return db.query(
      'INSERT INTO trainers (trainer_id, account_id, location, tags, equipment, credentials, socials, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [trainer_id, account_id, location, tags, equipment, credentials, socials, bio]
    )
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        throw err;
      });
  },

  editTrainer: (trainer: Trainer): Promise<any> => {
    const { trainer_id, account_id, location, tags, equipment, credentials, socials, bio } = trainer;
    return db.query(
      'UPDATE trainers SET location = $1, tags = $2, equipment = $3, credentials = $4, socials = $5, bio = $6 WHERE account_id = $7',
      [location, tags, equipment, credentials, socials, bio, account_id]
    )
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        throw err;
      });
  },

}