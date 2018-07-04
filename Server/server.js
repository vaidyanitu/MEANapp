const express=require('express');
const app=express();
var cors=require('cors');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const user=require('./routes/user.route');
const promo= require('./Assignment/promorouter');
const PORT=3000;
var cookieParser=require('cookie-parser');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var userAuthentication=require('./routes/userAuthentication');


mongoose.connect('mongodb://localhost/jwtauth');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}));
app.use('/authentication',userAuthentication);

function auth(req,res,next){
    console.log(req.session);

 if(!req.session.user){
        console.log(req.headers);
        var authHeader=req.headers.authorization;
        if(!authHeader){
            var err=new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate','Basic');
            err.status=401;
            next(err);
            return;
        }
        var auth= new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        var user=auth[0];
        var pass=auth[1];
        if(user=='admin' && pass=='password'){
            req.session.user='admin';
            next();//authorized        
        }
        else{
            var err= new Error('You are not authenticated!');
            res.setHeader('WWWAuthenticate','Basic');
            err.status=401;
            next(err);
        }
        }
else{
        if(req.session.user==='admin'){
            next();
        }
        else{
            var err= new Error('You are not authenticated!');
            err.status=401;
            next(err);
        }
    }
}

app.use(auth);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/user',user);
app.use('/promotion',promo);
//app.use(cors());


app.get('/checking',function(req,res){
    res.json({
        "Tutorial":"Welcome to the Node express JWT Tutorial"
    });
});

app.listen(PORT,function(){
    console.log('Server is running on port ',PORT);
});

