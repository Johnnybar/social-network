var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
var dbUrl;

if (process.env.DATABASE_URL){
    dbUrl = process.env.DATABASE_URL;
}
else{
    var userInfo = require('../secrets.json');
    var user = userInfo.username;
    var pass = userInfo.password;
    dbUrl = `postgres:${user}:${pass}psql@localhost:5432/network`;
}
var db = spicedPg(dbUrl);


/////////////////////////////////////////REGISTRATION QUERIES///////////////////////////////////////

exports.registerUser =function(first, last, email, password) {
    return db.query(
        'INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) returning id',
        [first, last, email, password]
    ).then((results) => {
        return results.rows;
    });
};

exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) { return reject(err); }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) { return reject(err); }
                resolve(hash);
            });
        });
    });
};


exports.checkPassword = function(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};

/////////////////////////////////////////LOGIN QUERIES///////////////////////////////////////

exports.getHash = function(username) {
    return db.query(
        'SELECT password FROM users WHERE username =($1)',
        [username]
    ).then((results) => {
        return results.rows[0].password;
    }).catch((err) => {
        console.log(err);
    });
};

exports.checkPassword = function(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};
