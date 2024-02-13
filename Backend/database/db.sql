-- Table for account information
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
   username VARCHAR(24) NOT NULL CHECK (LENGTH(username) >= 6 AND LENGTH(username) <= 24),
    password VARCHAR(24) NOT NULL CHECK (LENGTH(password) >= 6 AND LENGTH(password) <= 24),
    is_trainer BOOLEAN NOT NULL,
    is_client BOOLEAN NOT NULL,
   first_name VARCHAR(24) NOT NULL CHECK (LENGTH(first_name) >= 1 AND LENGTH(first_name) <= 24),
    last_name VARCHAR(24) NOT NULL CHECK (LENGTH(last_name) >= 1 AND LENGTH(last_name) <= 24),
    phone_number VARCHAR(13),
    UNIQUE (username),
    CHECK ((is_trainer OR is_client) AND NOT (is_trainer AND is_client))
);

-- Table for trainer information
CREATE TABLE trainer (
    trainer_id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE REFERENCES account(account_id),
   location GEOGRAPHY(Point)
    tags VARCHAR(255)[] DEFAULT '{}',
    equipment VARCHAR(255)[] DEFAULT '{}',
    credentials VARCHAR(255)[] DEFAULT '{}',
    socials VARCHAR(255)[] DEFAULT '{}',
   bio TEXT,
   -- put pics in server not DB
);

-- Table for client information
CREATE TABLE client (
    client_id SERIAL PRIMARY KEY,
    account_id INTEGER UNIQUE REFERENCES account(account_id),
   location GEOGRAPHY(Point)
    tags VARCHAR(255)[] DEFAULT '{}',
    goals VARCHAR(255)[] DEFAULT '{}',
    contact_number VARCHAR(20),
    email VARCHAR(100),
   -- put pics in server not DB
   bio TEXT
);

-- Table for trainer payments
CREATE TABLE trainer_payment (
    payment_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainer(trainer_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL
   payment_method VARCHAR(50) NOT NULL, -- PayPal, Venmo, Bank Transfer, etc.
    transaction_id VARCHAR(100) -- Transaction ID from the payment processor
);

-- Table for client payments
CREATE TABLE client_payment (
    payment_id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES client(client_id),
    payment_amount DECIMAL(8, 2) NOT NULL,
    payment_date DATE NOT NULL
);

-- Table for trainer reviews
CREATE TABLE trainer_review (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainer(trainer_id),
    client_id INTEGER REFERENCES client(client_id),
   service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

-- Table for client reviews
CREATE TABLE client_review (
    review_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainer(trainer_id),
    client_id INTEGER REFERENCES client(client_id),
   service_name VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date DATE NOT NULL
);

-- Table for services provided by trainers
CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainer(trainer_id),
    activity VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50),
    cost DECIMAL(8, 2) NOT NULL,
    duration INTEGER NOT NULL, -- duration in minutes, for example
    location VARCHAR(255),
    description TEXT
);

-- Table for events
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES service(service_id), -- Reference to the service from the trainer table
    trainer_id INTEGER REFERENCES trainer(trainer_id),
    client_id INTEGER REFERENCES client(client_id),
   event_timestamp TIMESTAMP, -- No default, to be set explicitly
    notes TEXT -- Additional notes or details about the event
);

-- Table for messages
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL, -- Reference to either trainer or client ID
    receiver_id INTEGER NOT NULL, -- Reference to either trainer or client ID
    message_text TEXT NOT NULL,
   message_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);


-- Example query to find trainers within 10 kilometers of a given location
-- SELECT *
-- FROM trainer
-- WHERE ST_DWithin(location, ST_GeographyFromText('POINT(lon lat)'), 10000); -- 10,000 meters = 10 kilometers
