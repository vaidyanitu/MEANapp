const express=require('express');
const app=express();
var cors=require('cors');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const user=require('./routes/user.route');
const promo= require('./Assignment/promorouter');
const PORT=3000;


mongoose.connect('mongodb://localhost/jwtauth');

function auth(req,res,next){
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
        next();//authorized        
    }else{
        var err= new Error('You are not authenticated!');
        res.setHeader('WWWAuthenticate','Basic');
        err.status=401;
        next(err);
    }
}

app.use(auth);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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

