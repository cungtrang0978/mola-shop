const mysql = require('mysql')
const dbConfig = require('../config/config')

//create conn
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    password: dbConfig.PASSWORD,
    user: dbConfig.USER,
    database: dbConfig.DB
})

//Open conn
conn.connect(error => {
    if (error) throw error
    console.log("Successfully connected to the database.");
})

module.exports = conn;