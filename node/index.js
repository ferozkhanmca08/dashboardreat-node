const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken')
const jwtkey = 'e-comm';

 require('./db/config');
const Muser = require('./db/User');
const Mproduct = require('./db/Product');
const Product = require('./db/Product');
const app = express();
app.use(cors());
app.use(express.json());
app.post("/register", async (req,res)=>{   
    // res.send(req.body);
    let myuser = new Muser(req.body);
    let result = await myuser.save();
    result = result.toObject();   
    delete result.password
    //res.send(result);
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong please try sometime"})
        }
        res.send({result, auth:token})
    })
});

app.post("/login",async (req,res)=>{
    if(req.body.password && req.body.email){
    let user = await Muser.findOne(req.body).select("-password")
    if(user){
        Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send({result:"something went wrong please try sometime"})
            }
            res.send({user, auth:token})
        })
        //res.send(user)
        }
       else{res.send({result:'No User Found'})}
    }
    else{
        res.send({result:"email and password must need"});
    }
   
});
app.post("/add", verifyToken, async(req,res)=>{
    let mproduct = new Mproduct(req.body);
   let result = await mproduct.save();
   res.send(result);
})
app.get("/products", verifyToken, async (req,res)=>{
    let products = await Product.find(); 
    if(products.length>0){
        res.send(products)
    }else {
        res.send({result:"No Products"})
    }
})
app.delete("/product/:id", verifyToken, async (req,res)=>{
    const result = await Mproduct.deleteOne({_id:req.params.id})
    res.send(result)
})
app.get("/product/:id", verifyToken, async (req,res)=>{
   
    // let id = String(req.params.id);
    let result = await Mproduct.findOne({_id:req.params.id})
     if(result){res.send(result)}
     else{res.send({result:"No Record Found"})}
})
app.put("/product/:id", verifyToken, async (req,res)=>{
    let result = await Mproduct.updateOne(
        {_id:req.params.id },
        {
            $set:req.body
        }
    )
    res.send(result);
})
app.get("/search/:key", async (req,res)=>{
   // res.send(req.params.key)  find(name: {$regex: /^search/});
   let val = req.params.key
   let result = await Mproduct.find({
    "name": new RegExp(val)
    })
   res.send(result)
})
app.get("/src/:key", verifyToken,async (req,res)=>{
    let result = await Mproduct.find({
        "$or":[
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {price: {$regex: req.params.key}}
        ]
    })
    res.send(result);
})
function verifyToken(req,res,next){   
    let token= req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"Please provide valid token"})
            }
            else{next();}
        })
    }else{res.status(403).send({result:"Please add token with header"})}
 
   
}
app.listen(5000);