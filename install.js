//Installera databas

const sqlite3 = require("sqlite3").verbose();
const express = require("express");
require("dotenv").config();

const db1 = new sqlite3.Database(process.env.DATABASE_USERS);
const db2 = new sqlite3.Database(process.env.DATABASE_MESSAGES);

db1.serialize(() => {
db1.run ("DROP TABLE IF EXISTS users;");

db1.run (`CREATE TABLE users (
user_id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL,
password TEXT NOT NULL,
user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`);
console.log("Table users created...")
})

db2.serialize(() => {
db2.run ("DROP TABLE IF EXISTS messages;");

db2.run (`CREATE TABLE messages (
message_id INTEGER PRIMARY KEY AUTOINCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
title VARCHAR(255) NOT NULL,
message VARCHAR(300) NOT NULL,
message_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
FOREIGN KEY (username)
REFERENCES users (username)
);
`);
console.log("Table messages created...")
})


db1.close();
db2.close();
