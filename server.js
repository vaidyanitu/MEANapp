const express=require('express');
const app=express();
var cors=require('cors');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const user=require('./routes/user.route');
const PORT=3000;


mongoose.connect('mongodb://localhost/jwtauth');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',user);
//app.use(cors());


app.get('/checking',function(req,res){
    res.json({
        "Tutorial":"Welcome to the Node express JWT Tutorial"
    });
});

app.listen(PORT,function(){
    console.log('Server is running on port ',PORT);
});

