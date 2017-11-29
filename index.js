const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var db = require('./config/db');
const bodyParser = require('body-parser');

app.use(compression());

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


//ADD EVERYTHING ABOVE THIS ONE v̍
app.get('/welcome', function(req, res){
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/', function(req, res){
    if (!req.session.user) {
        res.redirect('/welcome');
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
                db.registerUser(req.body.first, req.body.last, req.body.email, hashedPassword)
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

app.post('/logOut', ((req,res)=>{
    req.session = null;
    res.redirect('/welcome');
}));

app.get('*', function(req, res){
    // if (!req.session.user) {
    //     res.redirect('/welcome');
    // } else {
    res.sendFile(__dirname + '/index.html');
    // }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
