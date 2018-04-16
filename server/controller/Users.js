'use strict';

module.exports = Users;

function Users(dbExec) {
    const users = {};

    users.create = async function(body) {
        return dbExec(async collection => {
            const result = await collection.insertOne(body);
            return result.insertedCount > 0;
        });        
    };
    
    users.authenticate = async function(username, password) {
        return dbExec(async collection => {
            const results = await collection.find({ username, password }).toArray();
            return results.length > 0;
        });
    };

    users.exists = async function(username) {
        return dbExec(async collection => {
            const results = await collection.find({ username }).toArray();
            return results.length > 0;
        });
    };

    users.findByUsername = async function(username) {
        return dbExec(async collection => {
            const results = await collection.find({ username }).toArray();
            if (results.length > 0) {
                return results[0];
            }
            else {
                return false;
            }
        });
    }

    return users;
}
