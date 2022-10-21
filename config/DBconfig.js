const mysql = require("mysql");

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "4511to",
    port : "3306",
    database : "nodejs_db"
})

module.exports = conn;
