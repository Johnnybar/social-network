const express = require('express');
const app = express();
const compression = require('compression');
// var session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}
app.use(cookieParser());
// app.use(session({
//     store: new Store({
//         ttl: 3600,
//         host: 'localhost',
//         port: 6379
//     }),
//     resave: false,
//     saveUninitialized: true,
//     secret: 'my super fun secret'
// }));
app.use(express.static('./public'));


//ADD EVERYTHING ABOVE THIS ONE v̍
// app.get('/welcome', function(req, res){
//     // if (req.session.user) {
//     //     res.redirect('/');
//     // } else {
//     //     res.sendFile(__dirname + '/index.html');
//     // }
// });

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
