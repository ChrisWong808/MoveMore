const db = require('../../database');

module.exports = {
  accountsModel: require('./accountsModel')(db),
  trainersModel: require('./trainersModel')(db),
  clientsModel: require('./clientsModel')(db),
  // paymentsModel: require('./paymentsModel')(db),
  // reviewsModel: require('./reviewsModel')(db),
  // servicesModel: require('./servicesModel')(db),
  // eventsModel: require('./eventsModel')(db),
  // messagesModel: require('./messagesModel')(db)
}