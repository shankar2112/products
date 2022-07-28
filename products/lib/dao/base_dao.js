const mysql = require('../../common/db_utils');

module.exports = class BaseDao {
    constructor() {
    }
    getReadConnection() {
        return new Promise(async (resolve, reject) => {
            try {
                var read_connection = mysql.readConnection();
                return resolve(read_connection);
            }
            catch (error) {
                return reject(error);
            }
        })
    }

    releaseReadConnection(connection) {
        return new Promise(async (resolve, reject) => {
            try {
                if (connection != null) {
                    var conn = await connection.release();
                    return resolve(conn);
                }
            }
            catch (error) {
                return reject(error)
            }
        })

    }

}
