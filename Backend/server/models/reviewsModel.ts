interface Review {
  review_id: number;
  trainer_id: number;
  client_id: number;
  service_name: string;
  rating: number;
  review_text: string;
  review_date: Date;
}

module.exports = (db: any) => {
  return {
    getTrainerReviews: (trainer_id: number): Promise<Review[]> => {
      return db.query('SELECT * FROM trainer_reviews WHERE trainer_id = $1', [trainer_id])
        .then((result: Review[]) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    getClientReviews: (client_id: number): Promise<Review[]> => {
      return db.query('SELECT * FROM client_reviews WHERE client_id = $1', [client_id])
        .then((result: Review[]) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    createTrainerReview: (review: Review): Promise<any> => {
      console.log('Review object in create trainer review model:', review);
      const query = `
        INSERT INTO trainer_reviews (
          trainer_id,
          client_id,
          service_name,
          rating,
          review_text,
          review_date
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `;

      const parameters: any[] = [
        review.trainer_id,
        review.client_id,
        review.service_name,
        review.rating,
        review.review_text,
        review.review_date
      ];
      console.log('create trainer review Query:', query);
      console.log('create trainer review Parameters:', parameters);

      return db.query(query, parameters)
        .then((result: any) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    },

    createClientReview: (review: Review): Promise<any> => {
      const query = `
        INSERT INTO client_reviews (
          trainer_id,
          client_id,
          service_name,
          rating,
          review_text,
          review_date
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `;

      const parameters: any[] = [
        review.trainer_id,
        review.client_id,
        review.service_name,
        review.rating,
        review.review_text,
        review.review_date
      ];

      return db.query(query, parameters)
        .then((result: any) => {
          return result;
        })
        .catch((err: any) => {
          throw err;
        });
    }
  };
};