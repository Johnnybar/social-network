var spicedPg = require('spiced-pg');
var bcrypt = require('bcryptjs');
var dbUrl;
const bucket = require('./config.json');

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

exports.registerUser =function(first, last, email, password, imgUrl) {
    return db.query(
        'INSERT INTO users (first, last, email, password, imgUrl) VALUES ($1, $2, $3, $4, $5) returning id',
        [first, last, email, password, imgUrl]
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

exports.getHash = function(email) {
    return db.query(
        'SELECT password, id FROM users WHERE email =($1)',
        [email]
    ).then((results) => {
        return results.rows[0];
    }).catch((err) => {
        return err;
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


/////////////////////////////////////////GETTING USER DATA///////////////////////////////
exports.getUserInp = function(result){
    return db.query(
        'SELECT first, last, imgUrl FROM users WHERE id =($1)',
        [result]
    ).then((results) => {
        results.rows.forEach(elem => {
            elem.imgurl = bucket.s3Url + elem.imgurl;
        });
        return results.rows[0];
    }).catch((err) => {
        console.log(err);
    });
};

/////////////////////////////////////////GETTING USER DATA///////////////////////////////

exports.updateProfile = function(imgurl, id) {
    return db.query(
        `UPDATE users
        SET imgurl =($1)
        WHERE id =($2)`,
        [imgurl, id]
    ).then((results) => {
        return results.rows[0];

    }).catch((err) => {
        return err;
    });
};
