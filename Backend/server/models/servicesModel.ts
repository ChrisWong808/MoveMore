interface Service {
  service_id: number;
  trainer_id: number;
  activity: string;
  difficulty: string;
  cost: number;
  duration: number;
  location: string;
  description: string;
}

module.exports = (db: any) => {
  return {
    getServices: (trainer_id: number): Promise<Service[]> => {
      return db.query('SELECT * FROM services WHERE trainer_id = $1', [trainer_id])
        .then((result: Service[]) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    createService: (service: Service): Promise<any> => {
      const query = `
        INSERT INTO services (
          trainer_id,
          activity,
          difficulty,
          cost,
          duration,
          location,
          description
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING service_id, trainer_id, activity, difficulty, cost, duration, location, description
      `;

      const parameters: any[] = [
        service.trainer_id,
        service.activity,
        service.difficulty,
        service.cost,
        service.duration,
        service.location,
        service.description
      ];

      return db.query(query, parameters)
        .then((result: any) => {
          return result[0];
        })
        .catch((err: any) => {
          throw err;
        });
    },

    editService: (service_id: number, service: Service): Promise<any> => {
      const query = `
        UPDATE services SET
        activity = $1,
        difficulty = $2,
        cost = $3,
        duration = $4,
        location = $5,
        description = $6
        WHERE service_id = $7
        RETURNING service_id, trainer_id, activity, difficulty, cost, duration, location, description
      `;

      const parameters: any[] = [
        service.activity,
        service.difficulty,
        service.cost,
        service.duration,
        service.location,
        service.description,
        service_id
      ];

      return db.query(query, parameters)
        .then((result: any) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    deleteService: (service_id: number): Promise<any> => {
      return db.query('DELETE FROM services WHERE service_id = $1', [service_id])
        .then((result: any) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    }
  };
};