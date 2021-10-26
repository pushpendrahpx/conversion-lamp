var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('useFindAndModify', false);

class Ntdatabase {
    constructor() {
        this.apiStartTime = new Date().getTime();
        this.db_con, this.timer;
        this.db_url = process.env.DATABASE_URI;              //When using with Docker, use "mongodb://mongo:27017/" else use "mongodb://localhost:27017/" 
        this.database_name = process.env.DATABASE_NAME ;
        setImmediate(async () => {
            this.db_con = await this._createConnection();
        })
    }

    check_connection = () => {
        if(this.db_con != undefined) {
            clearInterval(this.timer);
            return true;
        }
        return false;
    }

    retry_connection = () => {
        return mongoose.connect(this.db_url + this.database_name, {useNewUrlParser : true, useUnifiedTopology : true});
    }

    _createConnection = () => {
        return new Promise((resolve,reject) => {
            mongoose.connect(this.db_url + this.database_name, {useNewUrlParser : true, useUnifiedTopology : true}, function(e,db) {
                if(e) {
                    console.log(`error while creating connection : ${e}`);
                    // setTimeout(this._createConnection(), 5000);
                } else {
                    let url = db.connections[0].host + ':' + db.connections[0].port + '/' + db.connections[0].name;
                    console.log(url);
                    console.log(`connected successfully`);
                    resolve();
                }
            });
        })
    }

    insertIntoCollection = (model_name) => {
        return new Promise((resolve,reject) => {
            if(typeof model_name == 'object') {
                model_name.save((e, result) => {
                    if(!e) {
                        resolve(result);
                    }
                    else {
                        reject(e);
                    }
                });
            } else {
                reject({status : 104, message : "Invalid insert"});
            } 
        })
    }

    updateCollection = (model_name, update_condition_obj, new_values) => {
        return new Promise((resolve,reject) => {
                if(typeof update_condition_obj !='string' && typeof new_values !='string') {
                model_name.findOneAndUpdate(update_condition_obj, new_values, (e,result) => {
                    if(!e) {
                        resolve(result);
                    } else {
                        reject(e);
                    }
                });
            } else {
                reject({status : 104, message : "Invalid parameters for update"});
            }
        })
    }

    findFromCollection = (model_name, query_obj = {}) => {
        return new Promise((resolve,reject) => {
            if(model_name!=undefined && model_name!='') {
                model_name.find(query_obj, function(e,result) {
                    if(!e) {
                        resolve(result);
                    } else {
                        reject(e);
                    }
                });
            } else {
                reject({status : 104, message : "Invalid search"});
            }
        });
    }

    deleteFromCollection = (model_name, query_obj) => {
        return new Promise((resolve,reject) => {
            if(model_name!=undefined && model_name!='') {
                model_name.remove(query_obj, function(e,result) {
                    if(!e) {
                        resolve(result);
                    } else {
                        reject(e);
                    }
                });
            } else {
                reject({status : 104, message : "Invalid search"});
            }
        });
    }

}

let database = new Ntdatabase();
module.exports = database;