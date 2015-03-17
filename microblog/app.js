var express = require('express')
    , routes = require('./routes');

var app = module.exports = express.createServer();

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({
        dumpException: true, showStack: true
    }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});




app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.get('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);

var users = {
    'lvxinsheng': {
        name: 'lvinxheng'
        ,website: 'lvictory.me'
    }
}

app.all('/user/:username', function(req, res, next){
    if(users[req.params.username]){
        next();
    } else{
        next(new Error(req.params.username + 'does not exist'));
    }
});

app.get('/user/:username', function(req, res) {
    res.send(JSON.stringify(users[req.params.username]));
});

app.put('/user/:username', function(req, res) {
    res.send('Done');
});

// app.all('/user/:username', function(req, res, next){
//     res.send('hello all get');
//     next();
// });
// app.get('/user/:username', function(req, res){
//     res.send('user: ' + req.params.username);
// });

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);