const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var db = require('./config/db');
const bodyParser = require('body-parser');
const s3 = require('./s3');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
var imgUrl = 'emptyProfile.gif';
var bio = 'This is your default description';
var csurf = require('csurf');
const server = require('http').Server(app);
const io = require('socket.io')(server);
let onlineUsers = [];

app.use(compression());

var diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

var uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

if (process.env.NODE_ENV != 'production') {
  app.use('/bundle.js', require('http-proxy-middleware')({target: 'http://localhost:8081/'}));
}

app.use(cookieSession({
  secret: 'my super secret',
  maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(csurf());
app.use(function(req, res, next) {
  res.cookie('mytoken', req.csrfToken());
  next();
});

app.get('/welcome/', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.get('/', function(req, res) {
  if (!req.session.user) {
    res.redirect('/welcome/');
  } else {

    res.sendFile(__dirname + '/index.html');

  }
});

app.post('/register', function(req, res) {
  if (req.body.password && req.body.first && req.body.last, req.body.email) {
    db.hashPassword(req.body.password).then((hashedPassword) => {
      db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword, imgUrl, bio).then((results) => {
        req.session.user = {
          id: results[0].id,
          email: req.body.email,
          first: req.body.first,
          last: req.body.last
        };
        req.session.loggedIn = 'true';
        res.json({results, success: true});
      }).catch(function(err) {
        res.json({success:false})
        console.log(err);
      });
    });
  }
});

app.post('/login', function(req, res) {

  if (req.body.email && req.body.password) {
    let id;
    db.getHash(req.body.email).then((results) => {
      id = results.id;
      db.checkPassword(req.body.password, results.password).then((doesMatch) => {
        if (doesMatch) {
          req.session.user = {
            id: id
          };
          res.json({success: true});
        } else {
          console.log("that password did not match");
        }
      }).catch((err) => {
        console.log(err);
        res.json({success: false});
      });
    }).catch(function() {
      console.log('Error in catch of getHash');
      res.json({success: false});
    });
  } else {
    console.log('error');
  }
});

app.get('/user', function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    db.getUserInp(req.session.user.id).then(userDetails => {
      res.json(userDetails);
    });
  }
});

app.post('/upload', uploader.single('file'), function(req, res) {
  if (req.file) {
    var imgurl = req.file.filename;
    var id = req.session.user.id;
    s3.upload(req.file).then(function() {
      return db.updateProfile(imgurl, id);
    }).then(function() {
      res.json({
        imgurl: "https://s3.amazonaws.com/johnnybar/" + imgurl
      });
    }).catch(function() {
      res.json({success: false});
    });
  }
});

app.post('/updateBio', function(req, res) {
  var bio = req.body.bio;
  db.updateBio(bio, req.session.user.id).then(() => {
    res.json({bio, success: true});
  }).catch(function(err) {
    console.log(err);
  });

});

app.get('/otherUsersJson', function(req, res) {

  var id = req.query.id;
  db.getUserInp(id).then((data) => {
    res.json({data, success: true});
  }).catch(function(err) {
    console.log(err);
  });
});

app.get('/getOtherUsersFriends/:id', function(req, res) {
  var otherUser = req.params.id;
  var myUser = req.session.user.id;
  db.checkForFriendship(myUser, otherUser, 'Terminate Friendship').then((result) => {
    if (result.length == 0) {
      res.json({success: false});
    } else {
      db.getOtherUsersFriends(otherUser).then((results) => {
        res.json(results);
      }).catch(function(err) {
        console.log(err);
      });

    }
  }).catch(function(err) {
    console.log(err);
  });
});

app.get('/getFriendshipStatus/:recipientId', function(req, res) {
  var recipientId = req.params.recipientId;
  var senderId = req.session.user.id;
  db.getFriendshipStatus(senderId, recipientId).then((results) => {
    if (results.length == 0) {
      db.getFriendshipStatus(recipientId, senderId).then((results) => {
        if (results.length == 0) {
          res.json({results, success: true});
        } else {
          if (results[0].status == 'Cancel Friend Request') {
            results = {
              status: 'Accept Friend Request'
            };
            res.json({results, success: true});
          } else {
            results = results[0];
            res.json({results, senderId, success: true});
          }
        }
      }).catch(function() {
        res.json({success: false});
      });
    } else {
      results = results[0];
      res.json({results, success: true});
    }
  });
});

app.post('/changeFriendshipStatus/:recipientId', function(req, res) {
  var senderId = req.session.user.id;
  var recipientId = req.params.recipientId;
  var status = req.body.status;

  db.sendFriendRequest(senderId, recipientId, status).then(() => {
    res.json({success: true});
  }).catch(function() {
    res.json({success: false});
  });
});

app.post('/deleteFriendRequest/:recipientId', function(req, res) {
  var recipientId = req.params.recipientId;
  var senderId = req.session.user.id;

  db.deleteFriendRequest(recipientId, senderId).then(() => {
    res.json({success: true});
  }).catch(() => {
    res.json({success: false});
  });
  db.deleteFriendRequest(senderId, recipientId).then(() => {
    res.json({success: true});
  }).catch(() => {
    res.json({success: false});
  });
});

app.post('/acceptFriendRequest/:recipientId', (req, res) => {
  var recipientId = req.params.recipientId;
  var senderId = req.session.user.id;
  var status = req.body.status;

  db.acceptFriendRequest(status, senderId, recipientId).then(() => {
    res.json({success: true});
  }).catch(() => {
    res.json({success: false});
  });

});

app.get('/allFriendRequests', (req, res) => {

  db.getAllFriends().then((results) => {
    res.json({results, success: true});
  }).catch(() => {
    res.json({success: false});
  });

});

app.get('/getFriendsInfoToFriends', (req, res) => {
  var id = req.session.user.id;
  db.getFriendsInfoToFriends(id).then(results => {
    res.json({results, success: true});
  }).catch(() => {
    res.json({success: false});
  });
});

app.post('/acceptFriendOnFriends', (req, res) => {
  var id = req.session.user.id;
  var otherId = req.body.id;
  db.acceptFriendOnFriends('Terminate Friendship', otherId, id).then(() => {
    res.json({otherId, success: true});
  }).catch(() => {
    res.json({success: false});
  });
});

app.post('/terminateFriendOnFriends', (req, res) => {
  var id = req.session.user.id;
  var otherId = req.body.id;
  db.terminateFriendOnFriends(otherId, id).then(() => {
    res.json({otherId, success: true});
  }).catch(() => {
    res.json({success: false});
  });
});

app.get('/connected/:socketId', (req, res, next) => {
  var socketId = req.params.socketId;
  if (!req.session.user) {
    return next();
  }
  const userDidJoin = !onlineUsers.find(obj => obj.userId == req.session.user.id);
  if (userDidJoin) {
    onlineUsers.push({userId: req.session.user.id, socketId: req.params.socketId});
    db.getSpecificUserById(req.session.user.id).then(user => {
      io.sockets.emit('userJoined', user);
    });
    // }
  }
  let ids = onlineUsers.map(user => user.userId);

  ///Remove logged in users from online users

  if (ids.includes(req.session.user.id) == true) {
    var user = req.session.user.id;
    ids = ids.filter(function(id) {
      return id !== user;
    });

  }
  //Query to check if IDs contain req.session user. If so - remove from IDs array

  db.getUsersByIds(ids).then(users => {
    io.sockets.sockets[socketId].emit('onlineUsers', users);
    io.sockets.sockets[socketId].emit('chatMessages', messagesArr);
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/logOut', ((req, res) => {
  req.session = null;
  res.redirect('/welcome/');

}));

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 8080, () => (console.log('listening on port 8080')));
let id;
let messagesArr = [];

io.on('connection', function(socket) {
  socket.on('chat', function(text) {
    for (let i = 0; i < onlineUsers.length; i++) {
      if (onlineUsers[i].socketId == socket.id) {
        id = onlineUsers[i].userId;
      }
    }
    db.getSpecificUserById(id).then((results) => {
      const messageWithUser = {
        first: results[0].first,
        last: results[0].last,
        imgurl: results[0].imgurl,
        text: text
      };

      messagesArr.push(messageWithUser);
      io.sockets.emit('chatMessage', messageWithUser);
    });
  });

  console.log(`socket with the id ${socket.id} is now connected`);
  socket.on('disconnect', function() {
    console.log(`socket with the id ${socket.id} is now disconnected`);
    if (!onlineUsers) {
      return null;
    } else {
      var disconnectedUser = onlineUsers.find(user => user.socketId == socket.id);
      if (typeof disconnectedUser == 'undefined') {
        return null;
      }
      var userId = disconnectedUser.userId;
      onlineUsers = onlineUsers.filter(user => user != disconnectedUser);
      if (onlineUsers.every(onlineUsers => onlineUsers.userId != userId)) {
        io.sockets.emit('userLeft', {userId: userId});
      }
    }
  });
});
