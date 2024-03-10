// const db = require('../../database');

interface Client {
  client_id: number;
  account_id: number;
  location: any;
  tags: string[];
  goals: string[];
  bio: string;
}

module.exports = (db: any) => {
  return {
    getClient: (client_id: number): Promise<Client> => {
      return db.query(`SELECT * FROM clients WHERE client_id='${client_id}'`)
      .then((result: Client[]) => {
        return result[0];
      })
      .catch((err: any) => {
        return err;
      });
    },

    createClient: (client: Client): Promise<any> => {
      const query = `
        INSERT INTO clients (
          account_id,
          location,
          tags,
          goals,
          bio
        ) VALUES ($1, $2, $3, $4, $5)
      `;

      const parameters: any[] = [
        client.account_id,
        client.location,
        client.tags,
        client.goals,
        client.bio
      ];

      return db.query(query, parameters)
        .then((result: any) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    editClient: ( client_id: number, location: string, tags: string[], goals: string[], bio: string): Promise<any> => {
      console.log('Updating client tags:', tags); // Log the tags before the query
      console.log('Checking client id:', client_id);
      return db.query(
        'UPDATE clients SET location = $1, tags = $2, goals = $3, bio = $4 WHERE client_id = $5',
        [location, tags, goals, bio, client_id]
        )
      .then((result: any) => {
        console.log('Database Update Result:', result);
        return result;
      })
      .catch((err: any) => {
        console.error('Database Update Error:', err);
        return err;
      });
    },

  }
}