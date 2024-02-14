const db = require('../database/db');

module.exports = {
  // event_id,service_id,trainer_id,client_id,event_timestamp,notes
  getUpcomingEventsByTrainerId: (trainer_id) => {
    const currentTimestamp = getCurrentTimestamp();
    return db.query(`SELECT * FROM events WHERE trainer_id='${trainer_id}' AND event_timestamp > '${currentTimestamp}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  getUpcomingEventsByClientId: (client_id) => {
    const currentTimestamp = getCurrentTimestamp();
    return db.query(`SELECT * FROM events WHERE client_id='${client_id}' AND event_timestamp > '${currentTimestamp}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  createEvent: (event_id,service_id,trainer_id,client_id,event_timestamp,notes) => {
    return db.query(`INSERT INTO events (event_id,service_id,trainer_id,client_id,event_timestamp,notes) VALUES ($1, $2, $3, $4, $5, $6)`, [event_id,service_id,trainer_id,client_id,event_timestamp,notes])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

//idk if we should track reschedules
  rescheduleEvent: (event_id, event_timestamp) => {
    const currentTimestamp = getCurrentTimestamp();
    return db.query(`UPDATE events SET event_timestamp = '${event_timestamp}' WHERE event_id = '${event_id}'`)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  },

  rescheduleEvent: async (event_id, new_event_timestamp) => {
    try {
        const getCurrentTimestamp = () => {
            const now = new Date();
            return now.toISOString(); // Adjust the format as needed
        };

        const addHoursToTimestamp = (timestamp, hours) => {
            const originalDate = new Date(timestamp);
            const newDate = new Date(originalDate.getTime() + hours * 60 * 60 * 1000);
            return newDate.toISOString(); // Adjust the format as needed
        };

        const currentTimestamp = getCurrentTimestamp();
        const minimumAllowedTimestamp = addHoursToTimestamp(currentTimestamp, 24);

        if (new_event_timestamp < minimumAllowedTimestamp) {
            throw new Error('New event_timestamp must be at least 24 hours in the future.');
        }

        const existingEvent = await db.query(`SELECT event_timestamp FROM events WHERE event_id = '${event_id}'`);
        const currentEventTimestamp = existingEvent[0].event_timestamp;

        if (currentEventTimestamp < minimumAllowedTimestamp) {
            throw new Error('Event timestamp is less than 24 hours from now. Cannot reschedule.');
        }

        // If both checks pass, proceed with the update
        const result = await db.query(`
            UPDATE events
            SET event_timestamp = '${new_event_timestamp}'
            WHERE event_id = '${event_id}'
        `);

        return result;
    } catch (err) {
        return err;
    }
},


}