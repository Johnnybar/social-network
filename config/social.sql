DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(300) NOT NULL,
    last VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    password text NOT NULL,
    imgurl text,
    bio text,
    UNIQUE(email)
);
