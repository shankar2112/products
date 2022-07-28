const mysql = require('../../common/db_utils');
var debug = require('debug')('v1:product:dao');
const BaseDao = require('./base_dao');

class ProductsDao extends BaseDao {

    createProducts(connection, products) {
        return new Promise(async(resolve, reject) => {
            try {
                if(connection == null ) {
                    var err_code = { status: 500, code: 5001, message: "DB Connection Failed!.", developerMessage:"DB Connection Failed!." };
                    return reject (err_code)
                }
                await connection.query(`INSERT INTO ${process.env.DB_DATABASE}.products SET ?`, products);
                debug('COMMIT at createProducts');
                return resolve(products);
            }
            catch (err) {
                var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
                debug("create createProducts error :", err);
                return reject(err_code);
            }
        })
    }

    getProductDetailById(connection, product_id) {
        return new Promise(async(resolve, reject)=> {
            try{
                if(connection == null) {
                    var err_code = { status: 500, code: 5001, message: "DB Connection Failed!", developerMessage:"DB Connection Failed!"};
                    return reject(err_code);
                }

                var custQuery = `SELECT * FROM ${process.env.DB_DATABASE}.products WHERE product_id='${product_id}'`;
                let queryres = await connection.query(custQuery);
                if(queryres.length == 0) {
                    var error_code = { status: 404, code: 4001, message: "Sorry, Data Not Available!.", developerMessage: "Sorry, Data Not Available!." };
                    return resolve(error_code)
                }
                else{
                    var res = JSON.parse(JSON.stringify(queryres));
                    var response = res[0];
                    return resolve(response);
                }
            }
            catch(error) {
                var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
                debug('getProductDetailById error :', error)
                return reject(err_code);
            }
        })
    }

    getProducts(connection, query) {
        return new Promise(async(resolve, reject)=> {
            try{
                if(connection == null) {
                    var err_code = { status: 500, code: 5001, message: "DB Connection Failed!", developerMessage:"DB Connection Failed!"};
                    return reject(err_code);
                }
                var custQuery = `SELECT * FROM ${process.env.DB_DATABASE}.products`;
                debug("getProducts", custQuery)
                let queryres = await connection.query(custQuery);
                if(queryres.length == 0) {
                    var error_code = { status: 404, code: 4001, message: "Sorry, Products Not Available!.", developerMessage: "Sorry, Products Not Available!." };
                    return resolve(error_code)
                }
                else{
                    return resolve(queryres);
                }
            }
            catch(error) {
                var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
                debug('getProducts error :', error)
                return reject(err_code);
            }
        })
    }

    getProductsCounts(connection, query) {
        return new Promise(async(resolve, reject)=> {
            try{
                if(connection == null) {
                    var err_code = { status: 500, code: 5001, message: "DB Connection Failed!", developerMessage:"DB Connection Failed!"};
                    return reject(err_code);
                }
                var custQuery = `SELECT COUNT(*) AS count FROM ${process.env.DB_DATABASE}.products`;
                debug("getProducts", custQuery)
                let queryres = await connection.query(custQuery);
                if(queryres.length == 0) {
                    return resolve(0)
                }
                else{
                    var res = JSON.parse(JSON.stringify(queryres));
                    var response = res[0].count;
                    return resolve(response);
                }
            }
            catch(error) {
                var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
                debug('getProducts error :', error)
                return reject(err_code);
            }
        })
    }
}

module.exports = {
    ProductsDao
}