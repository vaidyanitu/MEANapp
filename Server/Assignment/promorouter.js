const mongoose=require('mongoose');
mongoose.Promise=require('bluebird');

const Promotions=require('./promotions');
const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');

// const url='mongodb://localhost:27017/assignment';
// const connect=mongoose.connect(url);

// connect.then((db)=>{
//     console .log('Connected correctly to the server');
//     // var Promotion= Promotions({
//     //     name: "Weekend Grand Buffet",
//     //     image: "images/buffet.png",
//     //     label: "New",
//     //     price: "19.99",
//     //     description: "Featuring . . .",
//     //     featured: false
//     // });
//     // Promotion.save().then((Promotions)=>{
//     //     console.log(Promotions);
//     // })
// })

router.use(bodyParser.json());
router.route('/')
.get((req,res,next)=>{
    Promotions.find()
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Dish Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
  res.end('Put operation not supported on /promotion');
})

router.route('/:promoId')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post operation not supported on /promotion/'+req.params.promoId);
})
.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promo)=>{
        console.log(promo);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
         res.json(promo);
     }, (err) => next(err))
     .catch((err) => next(err));
})
.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    // .remove()
    .exec()
    .then((resp)=>{
        console.log(resp);
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

router.route('/:promoId/comments')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        if(promo !=null){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(promo.comments);
        }
        else{
            err= new Error('Dish '+ req.params.promoId + ' not found' );
            err.status=404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        if(promo!=null){
            promo.comments.push(req.body);
            promo.save()
            .then((promo)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(promo);
            },(err)=>{
                console.log(err);
                next(err)});
        }
        else{
            err= new Error('Promo '+req.params.promoId+ ' not found');
            err.status=404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res)=>{
    res.statusCode=403;
    res.end('Put operation not supported on /promotion/'+req.params.promoId+'/comments');
})
.delete((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        if(promo !=null){
            for(var i=(promo.comments.length -1);i>=0;i--){
                promo.comments.id(promo.comments[i]._id).remove();
            }
            promo.save()
            .then((promo)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(promo);
            },(err)=>next(err));
        }
        else {
            err = new Error('Promotion ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports=router;