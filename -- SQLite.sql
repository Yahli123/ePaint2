-- SQLite



CREATE TABLE IF NOT EXISTS users (
    user_id integer PRIMARY KEY AUTOINCREMENT,
    email text NOT NULL UNIQUE,
    username text NOT NULL UNIQUE,
    password text NOT NULL UNIQUE,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO users (username, email, password, created_at) VALUES ('admin', 'admin@example.com', 'admin@example.com', CURRENT_DATE);


SELECT * FROM users;