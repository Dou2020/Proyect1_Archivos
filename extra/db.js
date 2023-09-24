const mysqlhost = process.env.MYSQLHOST || 'localhost';
const mysqluser = process.env.MYSQLUSER || "patitoOliver";
const mysqlpass = process.env.MYSQLPASS || "Oliver12345";
const mysqldatabase = process.env.MYSQLDATABASE || "patitobd";
const mysql = require('mysql');

const connection = mysql.createConnection({
   host: mysqlhost,
   user: mysqluser,
   password: mysqlpass,
   database: mysqldatabase,
   port: 3306
});
connection.connect(function(error){
   if(error){
      console.log('El error en la conexion es: '+ error);
      return;
   }
   console.log('Nos conectamos exitosamente.');
});
 
module.exports = connection;

