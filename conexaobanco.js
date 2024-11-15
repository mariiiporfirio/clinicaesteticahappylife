let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "clinicaesteticahappylife"
});

pool.getConnection(function(err, connection){
    if(err){
        console.error("Erro de conexão: " + err.stack);
        return;
    }
    console.log("Conectado como ID " + connection.threadId);
    connection.release();
});
     
     
module.exports = pool;