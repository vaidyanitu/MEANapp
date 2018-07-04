const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var User=require('../models/user.model');
var session=require('express-session');

router.use(bodyParser.json());

router.post('/signup',(req,res,next)=>{
    User.findOne({username:req.body.username})
    .then((user)=>{
        if(user!=null){
            var err= new Error('User '+req.body.username+ ' already exists');
            err.status=403;
            next(err);
        }
        else{
            return User.create({ 
                _id:mongoose.Types.ObjectId(),           
                email:req.body.email,
                password:req.body.password });
        }
    })
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({status:'Registration successful!',user:user});
    },(err)=>next(err))
    .catch((err)=>next(err));
});


router.post('/login',(req,res,next)=>{
    if(!req.session.user){
        var authHeader=req.headers.authorization;

        if(!authHeader){
            var err=new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate','Basic');
            err.status=401;
            return next(err);
        }
        var auth= new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        var username=auth[0];
        var password=auth[1];

        User.findOne({email:username})
        .then((user)=>{
            if(user=== null){
            var err=new Error('User '+ email+ ' does not exist');
            err.status=403;
            return next(err);
            }
            else if (user.password!==password){
            var err=new Error('Your password is incorrect');
            err.status=403;
            return next(err);
            }
            else if (user.email===username && user.password===password){
            req.session.user='authenticated',
            res.statusCode=200;           
            res.setHeader('Content-Type','text/plain');
            res.end('You are authenticated!');
            }
        })
        .catch((err)=>next(err));
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
      }
})

router.get('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else{
        var err=new Error('You are not logged in');
            err.status=403;
             next(err);
    }
})

module.exports=router;