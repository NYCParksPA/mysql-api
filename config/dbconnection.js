var dbconfig = require('../config/db-config.json');
var mysql = require('mysql');
var util = require('util');

var dbpool = mysql.createPool({
    host     : dbconfig.host,
    user     : dbconfig.dbuser,
    password : dbconfig.dbpwd,
    port     : dbconfig.dbport,
    connectionLimit : dbconfig.conLimit,
    multipleStatements : dbconfig.multipleStatements
  });
  // database : dbconfig.dbname,
// Ping database to check for common exception errors.
dbpool.getConnection((err, connection) => {
  if (err) {
    switch(err.code) {
      case 'PROTOCOL_CONNECTION_LOST': {
        console.error('Database connection was closed.'); break;  
      }
      case 'ER_CON_COUNT_ERROR': {
        console.error('Database has too many connections.'); break;
      }
      case 'ECONNREFUSED': {
        console.error('Database connection was refused.'); break;
      }
      default: {
        console.log('DB.error', err); break;
      }
    }
  } 

  if (connection) connection.release()

  return;
});

// Promisify getConnection and query for the pool
dbpool.getConnection = util.promisify(dbpool.getConnection);
// Async function to get a promisified connection
dbpool.getPromisifiedConnection = async () => {
  try {
      const connection = await dbpool.getConnection();
      connection.query = util.promisify(connection.query);
      return connection;
  } catch (err) {
      console.error(err);
  }
}

// Promisify for Node.js async/await.
// Optionally, promisify the query directly on the pool for simpler operations
dbpool.query = util.promisify(dbpool.query);

module.exports = dbpool;