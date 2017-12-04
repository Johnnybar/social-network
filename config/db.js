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

const PENDING = 1, ACCEPTED = 2, CANCELED = 3, TERMINATED = 4, REJECTED = 5;

/////////////////////////////////////////REGISTRATION QUERIES///////////////////////////////////////

exports.registerUser =function(first, last, email, password, imgUrl, bio) {
    return db.query(
        'INSERT INTO users (first, last, email, password, imgUrl, bio) VALUES ($1, $2, $3, $4, $5, $6) returning id',
        [first, last, email, password, imgUrl, bio]
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
exports.getUserInp = function(id){
    return db.query(
        'SELECT first, last, imgurl, bio, email FROM users WHERE id =($1)',
        [id]
    ).then((results) => {
        results.rows.forEach(elem => {
            elem.imgurl = bucket.s3Url + elem.imgurl;
        });
        return results.rows[0];
    }).catch((err) => {
        console.log(err);
    });
};

/////////////////////////////////////////UPDATE PIC///////////////////////////////

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


/////////////////////////////////////////UPDATE USER PROFILE///////////////////////////////

exports.updateBio = function(bio, id) {
    console.log('running the db query to update bio ', bio, id);
    return db.query(
        `UPDATE users
        SET bio =($1)
        WHERE id =($2)`,
        [bio, id]
    ).then(() => {
        console.log('in the db query to update bio');

    }).catch((err) => {
        return err;
    });
};


//////////////////////////////////////////GET FRIENDSHIP STATUS////////////////////////////

exports.getFriendshipStatus = function(senderId, recipientId){
    return db.query(
        'SELECT status FROM friend_statuses WHERE sender_id =($1) AND recipient_id=($2)',
        [senderId, recipientId]
    ).then((results) => {
        return results.rows;
    }).catch((err) => {
        console.log(err);
    });
};


////////////////////////////////SEND AND DELETE FRIEND REQUESTS///////////////////////////////////////////////////////

exports.sendFriendRequest = (sender_id, recipient_id, status) => {
    return db.query(
        `INSERT INTO friend_statuses (sender_id, recipient_id, status) VALUES ($1, $2, $3)`,
        [sender_id, recipient_id, status]
    ).then(() => {
    }).catch(err => {
        console.log(err);
    });

};

exports.deleteFriendRequest = function(recipient_id){
    return db.query(
        'DELETE from friend_statuses WHERE recipient_id = $1',
        [recipient_id]
    ).then(() => {
        console.log('deleted request');
    }).catch((err) => {
        console.log(err);
    });
};

////////////////////////////////ACCEPT AND REJECT FRIEND REQUESTS///////////////////////////////////////////////////////
