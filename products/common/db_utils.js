const mysql = require('mysql');

const read_config = {
  host: process.env.DB_SRV_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  charset: 'utf8',
  multipleStatements: true,
  connectTimeout: 15000,
  acquireTimeout: 10000,
  debug: false
}

const readConnection = (sql, binding) => {
  return new Promise((resolve, reject) => {
    const _read_connection = mysql.createConnection(read_config);
    _read_connection.connect((err) => {
      if (err) reject(err);
      console.log("MySQL connected: threadId " + _read_connection.threadId);
      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
          _read_connection.query(sql, binding, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      };
      const release = () => {
        return new Promise((resolve, reject) => {
          if (err) reject(err);
          console.log("MySQL released: threadId " + _read_connection.threadId);
          _read_connection.end(error => error ? reject(error) : resolve());
        });
      };
      resolve({
        query,
        release
      });
    });
  })
};

module.exports = {
  readConnection,
};