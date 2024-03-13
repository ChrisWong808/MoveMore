// const db = require('../../database');

interface Account {
  account_id: number;
  username: string;
  password: string;
  role: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}

module.exports = (db: any) => {
  return {
      getAccount: (username: string, password: string): Promise<Account> => {
    return db.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password])
    .then((result: Account[]) => {
      if (result.length > 0) {
        return result[0]; // Assuming you want to return a single account
      } else {
        throw new Error('Username and password combination is incorrect or does not exist.');
      }
    })
    .catch((err: any) => {
      throw new Error('An error occurred while fetching the account.');
    });
  },

  checkUsernameExistence: (username: string) => {
    console.log('Check Username Existence method called in Model');
    const query = 'SELECT EXISTS (SELECT 1 FROM accounts WHERE username = $1) AS exists';
    const parameters = [username];

    return db.query(query, parameters)
      .then((result: any) => {
        if (result.rows && result.rows.length > 0) {
          return result.rows[0].exists;
        } else {
          return false; // Assuming no rows means username doesn't exist
        }
      })
      .catch((err: any) => {
        console.error('Error checking username existence in model:', err);
        throw err;
      });
  },



  createAccount: (account: Account): Promise<any> => {
    console.log('Create Account method called in Model');
    const query = `
      INSERT INTO accounts (
        username,
        password,
        role,
        first_name,
        last_name,
        phone_number,
        email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const parameters: any[] = [
      account.username,
      account.password,
      account.role,
      account.first_name,
      account.last_name,
      account.phone_number,
      account.email
    ];

    return db.query(query, parameters)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        throw err;
      });
  },

  changeCurrentRole: (role: string, account_id: number): Promise<any> => {
    console.log('Change Current Role method called in Model');
    const query = `
      UPDATE accounts SET role = $1 WHERE account_id = $2
    `;

    const parameters: any[] = [role, account_id];

    return db.query(query, parameters)
      .then((result: any) => {
        return result;
      })
      .catch((err: any) => {
        throw err;
      });
  },
}
  }
