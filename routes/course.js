const {Router}= require("express");
const courseRouter = Router();



courseRouter.post("/purchase",function(req,res){
    res.json({
        message: "purchase now"
    })
})

courseRouter.get("/preview",function(req,res){
    res.json({
        message: "current courses"
    })
})
module.exports={
    courseRouter:courseRouter
}