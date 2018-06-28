const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const User=require('../models/user.model');
const jwt=require('jsonwebtoken');


router.post('/signup',function(req,res){
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            return res.status(500).json({
                error:err
            });
        }
        else{
            const user=new User({
                _id:new mongoose.Types.ObjectId(),
                email:req.body.email,
                password:hash
            });
            user.save()
            .then(function(result){
                console.log(result); 
                return res.status(200).send(
                    "New user has been created"
                );                     
            }).catch(error=>{
                console.log(error);
                return res.status(500).json({
                    error:error
                });
            });
        }
    });
});

router.post('/signin',function(req,res){
    User.findOne({email:req.body.email})
    .exec()
    .then(function(user){
        bcrypt.compare(req.body.password,user.password,function(err,result){
            if(err){
                return res.status(401).json({
                    failed:'Unauthorized Access'
                });
            }
            if(result){
                const JwtToken=jwt.sign({
                    email:user.email,
                    _id:user._id
                },
            'secret',
                {
                  expiresIn:'2h'  
                });
                return res.status(200).json({
                    success:'Successfully logged in',
                    token:JwtToken
                });
            }       
            return res.status(401).json({
                failed:'Unauthorized Access'
            });
        });
    })
    .catch(error=>{
        res.status(500).json({
            error:error
        });
    });
});


module.exports=router;