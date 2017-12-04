-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friend_statuses;

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

CREATE TABLE friend_statuses(

id SERIAL PRIMARY KEY,
sender_id INTEGER NOT NULL,
recipient_id INTEGER NOT NULL,
status VARCHAR (255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP
)
