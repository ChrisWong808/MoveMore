-- Table for account information

DROP TABLE IF EXISTS accounts CASCADE;
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
\COPY accounts(account_id, username, password, role, first_name, last_name, phone_number)
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/accounts.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX idx_accounts_username ON accounts(username);

-- Drop table if exists trainers and related tables
DROP TABLE IF EXISTS trainers CASCADE;
CREATE TABLE trainers (
    trainer_id SERIAL PRIMARY KEY,
    username INTEGER UNIQUE REFERENCES accounts(username),
    location GEOGRAPHY(Point),
    tags VARCHAR(255)[] DEFAULT '{}',
    equipment VARCHAR(255)[] DEFAULT '{}',
    credentials VARCHAR(255)[] DEFAULT '{}',
    socials VARCHAR(255)[] DEFAULT '{}',
    bio TEXT
);
\COPY trainers(trainer_id, username, location, tags, equipment, credentials, socials, bio)
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/trainers.csv' DELIMITER ',' CSV HEADER;
CREATE INDEX idx_trainers_account_id ON trainers(username);

-- Drop table if exists trainers and related tables
DROP TABLE IF EXISTS clients CASCADE;

-- Table for client information
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE REFERENCES accounts(account_id),
    location GEOGRAPHY(Point),
    tags VARCHAR(255)[] DEFAULT '{}',
    goals VARCHAR(255)[] DEFAULT '{}',
    contact_number VARCHAR(20),
    email VARCHAR(100),
    bio TEXT
    -- put pics in server not DB
);

-- Data import for clients
\COPY clients(account_id, location, tags, goals, contact_number, email, bio)
FROM '/Users/christopherwong/Documents/MoveMore/Backend/database/data/clients.csv' DELIMITER ',' CSV HEADER;

-- Index creation
CREATE INDEX idx_clients_account_id ON clients(account_id);


-- Drop table if exists trainers and related tables
DROP TABLE IF EXISTS trainer_payments CASCADE;
CREATE TABLE trainer_payments (
    payment_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100)
);

\COPY trainer_payments(trainer_id, payment_amount, payment_date, payment_method, transaction_id)
FROM '/path/to/trainer_payments.csv' DELIMITER ',' CSV HEADER;

-- Table for client payments
CREATE TABLE client_payments (
    payment_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL
);

-- Data import for client payments
\COPY client_payments(client_id, payment_amount, payment_date)
FROM '/path/to/client_payments.csv' DELIMITER ',' CSV HEADER;

-- Table for trainer reviews
CREATE TABLE trainer_reviews (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

-- Data import for trainer reviews
\COPY trainer_reviews(trainer_id, client_id, service_name, rating, review_text, review_date)
FROM '/path/to/trainer_reviews.csv' DELIMITER ',' CSV HEADER;

-- Table for client reviews
CREATE TABLE client_reviews (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

-- Data import for client reviews
\COPY client_reviews(trainer_id, client_id, service_name, rating, review_text, review_date)
FROM '/path/to/client_reviews.csv' DELIMITER ',' CSV HEADER;

-- Table for services provided by trainers
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

-- Data import for services
\COPY services(trainer_id, activity, difficulty, cost, duration, location, description)
FROM '/path/to/services.csv' DELIMITER ',' CSV HEADER;

-- Table for events
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(service_id), -- Reference to the service from the trainer table
    trainer_id INTEGER REFERENCES trainers(trainer_id),
    client_id INTEGER REFERENCES clients(client_id),
    event_timestamp TIMESTAMP, -- No default, to be set explicitly
    notes TEXT -- Additional notes or details about the event
);

-- Data import for events
\COPY events(service_id, trainer_id, client_id, event_timestamp, notes)
FROM '/path/to/events.csv' DELIMITER ',' CSV HEADER;

-- Table for messages
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL, -- Reference to either trainer or client ID
    receiver_id INTEGER NOT NULL, -- Reference to either trainer or client ID
    message_text TEXT NOT NULL,
    message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Data import for messages
\COPY messages(sender_id, receiver_id, message_text, message_timestamp, is_read)
FROM '/path/to/messages.csv' DELIMITER ',' CSV HEADER;

-- Index creation
CREATE INDEX idx_trainers_account_id ON trainers(account_id);
CREATE INDEX idx_clients_account_id ON clients(account_id);
-- Add indexes for other tables as needed
