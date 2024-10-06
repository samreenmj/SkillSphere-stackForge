const {Router}= require("express");
const {adminModel}= require ("../db");
const jwt=require("jsonwebtoken");  
const {JWT_ADMIN_SECRET}=require ("../config")
const adminRouter= Router();
const adminMiddleware = require ("../middleware/admin")



adminRouter.post("/signup",async function(req,res){
    const {email,password,firstName,lastName}=req.body;
   await adminModel.create({email,password,firstName,lastName})   

    res.json({
        message: "signup successful.."
       
    })
})

adminRouter.post("/signin",async function(req,res){
    const{email,password}=req.body;
   const admin= await adminModel.findOne({email,password});
    if (admin){

        const token=jwt.sign({id:admin._id} ,JWT_ADMIN_SECRET);

        res.json({

            token:token
        })

    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
   
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId= req.adminId;

    const {title,description,imageUrl,price,creatorId}=req.body;

   const course= await courseModel.create({
        title,description,imageUrl,price,creatorId:adminId

    })
    res.json({
        message: "course created",
        courseId:course._id
    })
})



adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "purchased course"
    })
})

module.exports ={
    adminRouter:adminRouter
} 
