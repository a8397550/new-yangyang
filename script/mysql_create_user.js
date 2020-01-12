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

let sql;

/**
 * fire_user 用户表
  * user_id UNSIGNED int 要从10001开始
  * user_name string 128
  * password string 256
  * create_time 创建时间
  * modify_time 修改时间
  * status UNSIGNED TINYINT 状态默认为1，0表示不可用
  * telephone string 电话号码
  * email
 **/

sql = `CREATE TABLE IF NOT EXISTS fire_user (
  user_id int(18) UNSIGNED NOT NULL AUTO_INCREMENT,
  user_name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  Telephone varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT '',
  create_time datetime NOT NULL,
  modify_time datetime NOT NULL,
  status TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `

var sql1 = `alter table fire_user auto_increment= 10000;`

connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.query(sql1, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();