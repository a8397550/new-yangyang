var mysql = require('mysql');
const getConfig = require('./config');

const config = getConfig();

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect();

connection.query('show tables', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();