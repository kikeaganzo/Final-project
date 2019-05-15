DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;




CREATE TABLE users (
  id SERIAL primary key,
  firstname VARCHAR(255) not null,
  lastname VARCHAR(255) not null,
  email VARCHAR(255) not null unique,
  password VARCHAR(100) not null,
  bio text,
  imgurl VARCHAR(255)
);


CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiver INT NOT NULL REFERENCES users(id),
    sender INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    messages TEXT,
    userid SERIAL not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    senderUserid INTEGER NOT NULL REFERENCES users(id),
    receiverUserid INTEGER REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES users(id),
    commentid INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
