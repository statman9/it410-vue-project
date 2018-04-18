'use strict';

module.exports = Users;

const positions = [
    "coach",
    "team",
    "offense",
    "defense",
    "specialteams",
    "QB",
    "RB",
    "WR",
    "TE",
    "OL",
    "DL",
    "LB",
    "DB",
    "K",
    "P",
    "LS"
];

function generateID(length) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(let i = 0; i < length; i++)  {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

function Users(dbExec) {
    const users = {};

    users.create = async function(body) {
        body.messages = [];
        body.videos = [];
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
            return results.nModified > 0;
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

    users.sendMessage = async function(position, message) {
        message.id = generateID(12);
        message.read = false;
        message.timeSent = new Date();
        return dbExec(async collection => {
            if (positions.indexOf(position) > -1) {
                switch (position) {
                    case "coach":
                        var coordinators = await collection.find({usertype: {$regex: "*coordinator"}}).toArray();
                        var coach = await collection.find({usertype: {$regex: "*coach*"}}).toArray();
                        var allCoaches = coordinators.concat(coach);
                        if (allCoaches.length > 0) {
                            for (var i = 0; i < allCoaches.length; i++) {
                                allCoaches[i].messages.push(message);
                                const result = await collection.update({username: allCoaches[i].username}, allCoaches[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                    case "team":
                        var team = await collection.find({usertype: "player"}).toArray();
                        if (team.length > 0) {
                            for (var i = 0; i < team.length; i++) {
                                team[i].messages.push(message);
                                const result = await collection.update({username: team[i].username}, team[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                    case "offense":
                        var qb = await collection.find({position: "QB"}).toArray();
                        var rb = await collection.find({position: "RB"}).toArray();
                        var comb1 = qb.concat(rb);
                        var wr = await collection.find({position: "WR"}).toArray();
                        var comb2 = comb1.concat(wr);
                        var te = await collection.find({position: "TE"}).toArray();
                        var comb3 = comb2.concat(te);
                        var ol = await collection.find({position: "OL"}).toArray();
                        var offense = comb3.concat(ol);
                        if (offense.length > 0) {
                            for (var i = 0; i < offense.length; i++) {
                                offense[i].messages.push(message);
                                const result = await collection.update({username: offense[i].username}, offense[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                    case "defense":
                        var dl = await collection.find({position: "DL"}).toArray();
                        var lb = await collection.find({position: "LB"}).toArray();
                        var comb1 = dl.concat(lb);
                        var db = await collection.find({position: "DB"}).toArray();
                        var defense = comb1.concat(db);
                        if (defense.length > 0) {
                            for (var i = 0; i < defense.length; i++) {
                                defense[i].messages.push(message);
                                const result = await collection.update({username: defense[i].username}, defense[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                    case "specialteams":
                        var p = await collection.find({position: "P"}).toArray();
                        var k = await collection.find({position: "K"}).toArray();
                        var comb1 = p.concat(k);
                        var ls = await collection.find({position: "LS"}).toArray();
                        var specialteams = comb1.concat(ls);
                        if (specialteams.length > 0) {
                            for (var i = 0; i < specialteams.length; i++) {
                                specialteams[i].messages.push(message);
                                const result = await collection.update({username: specialteams[i].username}, specialteams[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                    default:
                        var pos = await collection.find({position: position}).toArray();
                        if (pos.length > 0) {
                            for (var i = 0; i < pos.length; i++) {
                                pos[i].messages.push(message);
                                const result = await collection.update({username: pos[i].username}, pos[i]);
                                if (result.nModified < 1) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        break;
                }

            }
            return false;
        });
    }

    users.messageRead = async function(username, messageid) {
        return dbExec(async collection => {
            var player = await collection.find({username}).toArray()[0];
            var message = player.messages.filter(m => m.id === messageid)[0];
            message.read = true;
            const result = await collection.update({username}, player);
            if (result.nModified > 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    return users;
}
