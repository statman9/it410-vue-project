'use strict';

module.exports = Users;

function Users(dbExec) {
    const users = {};

    users.create = async function(body) {
        body.messages = [];
        body.depthChartPosition = {
            "QB": 0,
            "RB": 0,
            "WR1": 0,
            "WR2": 0,
            "FLEX": 0,
            "FB": 0,
            "RT": 0,
            "RG": 0,
            "C": 0,
            "LG": 0,
            "LT": 0,
            "DT": 0,
            "LE": 0,
            "RE": 0,
            "CB1": 0,
            "CB2": 0,
            "LILB": 0,
            "RILB": 0,
            "LOLB": 0,
            "ROLB": 0,
            "SS": 0,
            "FS": 0
        };
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

    users.edit = async function(username, body) {
        return dbExec(async collection => {
            const results = await collection.update({username}, body);
            return result.nModified > 0;
        });
    }

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

    users.players = async function() {
        return dbExec(async collection => {
            const results = await collection.find({"usertype": "player"}).toArray();
            if (results.length > 0) {
                return results;
            }
            else {
                return false;
            }
        });
    }

    return users;
}
