--cant run in node, need to manually input in psql productsdb
psql api

DROP TABLE IF EXISTS accounts, trainers, clients, trainer_payments, client_payments, trainer_reviews, client_reviews, services, events, messages CASCADE;

CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    username VARCHAR(24) NOT NULL CHECK (LENGTH(username) >= 6 AND LENGTH(username) <= 24),
    password VARCHAR(24) NOT NULL CHECK (LENGTH(password) >= 6 AND LENGTH(password) <= 24),
    role VARCHAR(20),
    first_name VARCHAR(24) NOT NULL CHECK (LENGTH(first_name) >= 1 AND LENGTH(first_name) <= 24),
    last_name VARCHAR(24) NOT NULL CHECK (LENGTH(last_name) >= 1 AND LENGTH(last_name) <= 24),
    phone_number VARCHAR(13),
    UNIQUE (username)
);

COPY accounts
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/accounts.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX account_id_index ON accounts(account_id);

GRANT SELECT, UPDATE, DELETE, INSERT on accounts to christopherwong;

CREATE TABLE trainers (
    trainer_id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE REFERENCES accounts(account_id),
    location GEOGRAPHY(Point),
    tags VARCHAR(255)[] DEFAULT '{}',
    equipment VARCHAR(255)[] DEFAULT '{}',
    credentials VARCHAR(255)[] DEFAULT '{}',
    socials VARCHAR(255)[] DEFAULT '{}',
    bio TEXT
);

COPY trainers
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/trainers.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX trainer_id_index ON trainers(trainer_id);

GRANT SELECT, UPDATE, DELETE, INSERT on trainers to christopherwong;

CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE REFERENCES accounts(account_id),
    location GEOGRAPHY(Point),
    tags VARCHAR(255)[] DEFAULT '{}',
    goals VARCHAR(255)[] DEFAULT '{}',
    contact_number VARCHAR(20),
    email VARCHAR(100),
    bio TEXT
);

COPY clients
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/clients.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX client_id_index ON clients(client_id);

GRANT SELECT, UPDATE, DELETE, INSERT on clients to christopherwong;

CREATE TABLE trainer_payments (
    payment_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100)
);

COPY trainer_payments
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/trainer_payments.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX trainer_payments_id_index ON trainer_payments(payment_id);

GRANT SELECT, UPDATE, DELETE, INSERT on trainer_payments to christopherwong;

CREATE TABLE client_payments (
    payment_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL
);

COPY client_payments
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/client_payments.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX client_payments_id_index ON client_payments(payment_id);

GRANT SELECT, UPDATE, DELETE, INSERT on client_payments to christopherwong;

CREATE TABLE trainer_reviews (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

COPY trainer_reviews
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/trainer_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX trainer_reviews_id_index ON trainer_reviews(review_id);

GRANT SELECT, UPDATE, DELETE, INSERT on trainer_reviews to christopherwong;

CREATE TABLE client_reviews (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

COPY client_reviews
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/client_reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX client_reviews_id_index ON client_reviews(review_id);

GRANT SELECT, UPDATE, DELETE, INSERT on client_reviews to christopherwong;

CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    activity VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50),
    cost DECIMAL(8, 2) NOT NULL,
    duration INTEGER NOT NULL, -- duration in minutes, for example
    location VARCHAR(255),
    description TEXT
);

COPY services
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/services.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX services_id_index ON services(service_id);

GRANT SELECT, UPDATE, DELETE, INSERT on services to christopherwong;

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(service_id), -- Reference to the service from the trainer table
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    event_timestamp TIMESTAMP, -- No default, to be set explicitly
    notes TEXT -- Additional notes or details about the event
);

COPY events
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/events.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX events_id_index ON events(event_id);

GRANT SELECT, UPDATE, DELETE, INSERT on events to christopherwong;

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    message_text TEXT NOT NULL,
    message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

COPY messages
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/messages.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX messages_id_index ON messages(message_id);

GRANT SELECT, UPDATE, DELETE, INSERT on messages to christopherwong;