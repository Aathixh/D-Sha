-- using postgresql
CREATE DATABASE busmanagement;
\c busmanagement;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_number VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_point VARCHAR(100) NOT NULL,
    end_point VARCHAR(100) NOT NULL
);

CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES routes(id),
    bus_id INTEGER REFERENCES buses(id),
    driver_id INTEGER REFERENCES users(id),
    conductor_id INTEGER REFERENCES users(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

CREATE TABLE bus_stops (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES routes(id),
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    sequence_number INTEGER NOT NULL
);