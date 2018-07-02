var mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema= new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

const PromotionsSchema=new Schema
({
name:{
    type:String,
    required:true
    },
image:String,
label:String,
price:Number,
description:String,
comments:[commentSchema],
featured:Boolean
});



var Promotions= mongoose.model('Promotion',PromotionsSchema);
module.exports=Promotions;