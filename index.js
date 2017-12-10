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
const server = require('http').Server(app);
const io = require('socket.io')(server);
let onlineUsers = [];



app.use(compression());


var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
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
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use(cookieSession({
    secret: 'my super secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static('./public'));



app.get('/welcome/', function(req, res){
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/', function(req, res){
    if (!req.session.user) {
        res.redirect('/welcome/');
    } else {

        res.sendFile(__dirname + '/index.html');

    }
});

app.post('/register', function(req,res){
    console.log('running register');
    if (req.body.password && req.body.first && req.body.last, req.body.email) {
        console.log(req.body);
        db.hashPassword(req.body.password)
            .then((hashedPassword) => {
                console.log(hashedPassword);
                db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword, imgUrl, bio)
                    .then((results)=>{
                        req.session.user = { id: results[0].id, email: req.body.email, first:req.body.first, last: req.body.last  };
                        req.session.loggedIn = 'true';
                        res.json({ results,
                            success:true });
                    }).catch(function(err){
                        console.log(err);
                    });
            });
    }
});


app.post('/login', function(req, res){

    if(req.body.email && req.body.password){
        let id;
        db.getHash(req.body.email)
            .then((results)=>{
                id = results.id;
                db.checkPassword(req.body.password, results.password)
                    .then((doesMatch) => {
                        if(doesMatch){
                            req.session.user ={
                                id: id
                            };
                            res.json({success:true});
                        } else {
                            console.log("that password did not match");
                        }
                    }).catch((err) => {
                        console.log(err);
                        res.json({success: false});
                    });
            }).catch(function(){
                console.log('ERROR in catch of getHash');
            });
    }
    else{
        console.log('EERRRRROOORR');
    }
});

app.get('/user', function(req,res){
    if (!req.session.user) {
        res.redirect('/');
    }
    else{
        db.getUserInp(req.session.user.id)
            .then(userDetails =>{
                res.json(userDetails);
            });

    }
});


app.post('/upload', uploader.single('file'), function(req,res){
    if(req.file){
        var imgurl = req.file.filename;
        var id = req.session.user.id;
        s3.upload(req.file).then(function(){
            console.log(imgurl, id);
            return db.updateProfile(imgurl, id);
        }).then(function(){
            console.log('this is imgurl', imgurl);
            res.json({ imgurl:"https://s3.amazonaws.com/johnnybar/"+ imgurl });
        }).catch(function(){
            res.json({ success:false });
        });
    }
});

app.post('/updateBio', function(req,res){
    console.log('running updateBio');
    var bio= req.body.bio;
    db.updateBio(bio, req.session.user.id)
        .then(()=>{
            res.json({ bio,
                success:true });
        }).catch(function(err){
            console.log(err);
        });

});

app.get('/otherUsersJson', function(req,res){

    var id= req.query.id;
    console.log('this is the user we are checking out: ',id);
    console.log('this is the logged in user: ', req.session.user.id);
    db.getUserInp(id)
        .then((data)=>{
            res.json({ data,
                success:true });
        }).catch(function(err){
            console.log(err);
        });
});

app.get('/getFriendshipStatus/:recipientId', function(req,res){
    var recipientId= req.params.recipientId;
    var senderId = req.session.user.id;
    db.getFriendshipStatus(senderId, recipientId)
        .then((results)=>{
            if(results.length==0){
                db.getFriendshipStatus(recipientId, senderId)
                    .then((results)=>{
                        if(results.length ==0){
                            res.json ({ results, success: true});
                        }
                        else{
                            if(results[0].status =='Cancel Friend Request'){
                                results = {status: 'Accept Friend Request'};
                                res.json({results, success:true});
                            }
                            else{
                                results = results[0];
                                res.json ({results, senderId, success: true});
                            }
                        }
                    }).catch(function(){
                        res.json({success: false});
                    });
            }
            else{
                results = results[0];
                res.json({ results,
                    success:true });
            }
        });
});

app.post('/changeFriendshipStatus/:recipientId', function(req,res){
    var senderId =  req.session.user.id;
    var recipientId = req.params.recipientId;
    var status = req.body.status;

    db.sendFriendRequest(senderId, recipientId,status)
        .then(()=>{
            res.json({ success:true});
        }).catch(function(){
            res.json({ success: false});
        });
});

app.post('/deleteFriendRequest/:recipientId', function(req,res){
    var recipientId = req.params.recipientId;
    var senderId = req.session.user.id;

    db.deleteFriendRequest(recipientId, senderId)
        .then(()=>{
            res.json({ success:true});
        }).catch(()=>{
            res.json({ success: false});
        });
    db.deleteFriendRequest(senderId, recipientId)
        .then(()=>{
            res.json({ success:true});
        }).catch(()=>{
            res.json({ success: false});
        });
});

app.post('/acceptFriendRequest/:recipientId', (req,res) => {
    var recipientId = req.params.recipientId;
    var senderId = req.session.user.id;
    var status = req.body.status;

    db.acceptFriendRequest(status, senderId, recipientId)
        .then(() => {
            res.json({ success:true});
        }).catch(() => {
            res.json({ success: false});
        });

});

app.get('/allFriendRequests', (req,res)=>{

    db.getAllFriends()
        .then((results)=>{
            res.json({results,
                success:true});
        }).catch(()=>{
            res.json({success:false});
        });

});

app.get('/getFriendsInfoToFriends', (req,res)=>{
    var id = req.session.user.id;
    db.getFriendsInfoToFriends(id)
        .then(results=>{
            res.json({results,
                success:true});
        }).catch(()=>{
            res.json({success:false});
        });
});

app.post('/acceptFriendOnFriends', (req,res)=>{
    var id = req.session.user.id;
    var otherId = req.body.id;
    db.acceptFriendOnFriends('Terminate Friendship', otherId, id)
        .then(()=>{
            res.json({otherId, success:true});
        }).catch(()=>{
            res.json({success:false});
        });
});

app.post('/terminateFriendOnFriends', (req,res)=>{
    var id = req.session.user.id;
    var otherId = req.body.id;
    db.terminateFriendOnFriends(otherId, id)
        .then(()=>{
            res.json({otherId, success:true});
        }).catch(()=>{
            res.json({success:false});
        });
});

app.get('/connected/:socketId', (req,res, next)=>{

    var socketId= req.params.socketId;
    if (!req.session.user) {
        return next();
    }
    const userDidJoin = !onlineUsers.find(obj => obj.userId == req.session.user.id);
    if(userDidJoin){
        onlineUsers.push({
            userId: req.session.user.id,
            socketId: req.params.socketId
        });
        db.getSpecificUserById(req.session.user.id).then(user=>{
            io.sockets.sockets[socketId].broadcast.emit('userJoined', user);
        });
        const ids = onlineUsers.map(
            user => user.userId
        );

        db.getUsersByIds(ids).then(users =>{
            console.log('this is users after db query on connected/socket: ',users);
            io.sockets.sockets[socketId].emit('onlineUsers', users);
        }).catch((err)=>{
            console.log('there was an error ', err);
        });
        // }

    }
});

app.get('/disconnected/:socketId', (req,res)=>{
    var socketId= req.params.socketId;
    console.log('in appget disconnected');

    //LOOK FOR THIS SOCKET  AND REMOVE IT FROM ONLINE USERS
    for( var i = onlineUsers.length-1; i--;){
        if ( onlineUsers[i].socketId == socketId) {
            onlineUsers.splice(i, 1);
            console.log(onlineUsers);
        }
    }
    ///CHECK TO SEE IF THE REQ SESSION USER THAT LEFT IS NO LONGER IN LIST OF ONLINE USERS AND RETURN HIS ID SO OTHER USERS
    //CAN UPDATE ACCORDINGLY
    for( var j = onlineUsers.length-1; j--;){
        if ( onlineUsers[j].userId == req.session.user.id) {
            console.log('user still online');
        }
        else{
            io.sockets.sockets[socketId].broadcast.emit('userLeft', onlineUsers[j].userId);
        }
    }

});

// app.get('/getOnlineUsers', (req,res)=>{
//
//     res.json(onlineUsers);
//
// });

app.post('/logOut', ((req,res)=>{
    req.session = null;
    res.redirect('/welcome/');

}));

//ADD EVERYTHING ABOVE THIS ONE v̍

app.get('*', function(req, res){

    res.sendFile(__dirname + '/index.html');


});

server.listen(8080, function() {
    console.log("I'm listening.");
});

io.on('connection', function(socket) {
    socket.emit('uponConnection');
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        socket.emit('uponDisconnection');
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});
