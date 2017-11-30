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
                db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword, imgUrl)
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

app.post('/logOut', ((req,res)=>{

    req.session = null;
    res.redirect('/welcome/');

}));

//ADD EVERYTHING ABOVE THIS ONE v̍

app.get('*', function(req, res){

    res.sendFile(__dirname + '/index.html');

});

app.listen(8080, function() {
    console.log("I'm listening.");
});
