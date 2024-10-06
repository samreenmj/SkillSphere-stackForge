const {userModel}= require ("../db");
const jwt=require("jsonwebtoken");
const {Router}= require("express");
const {JWT_USER_SECRET}= require("../config")
const userRouter= Router();

userRouter.post("/signup",async function(req,res){
    const {email,password , firstName, lastName }=req.body;
  await  userModel.create({email,password,firstName,lastName});

    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const user= await userModel.findOne({email:email,password:password});
    if(user){
        const token=jwt.sign({id:user.
            _id},JWT_USER_SECRET);

        res.json({
          token:token
        })
       
    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
})

userRouter.get("/purchases",function(req,res){
    res.json({
        message: "purchased coursessss"
    })
})

module.exports ={
    userRouter : userRouter
}