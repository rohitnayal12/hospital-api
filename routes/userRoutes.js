const express= require('express');

const jwt = require('jsonwebtoken');

const bcrypt =require('bcrypt');
const userModel = require('../models/userModel');


const userRoute=express.Router()

userRoute.post(`/signup`,async(req,res)=>{

    try {
        let user=await userModel.findOne({email:req.body.email});

        if(user){
            return res.status(404).send({
                "error":"User Already exists."
            })
        }
    
        const {email,password,confirmPassword}=req.body
    
        if(password!=confirmPassword){
            return res.status(404).send({
                "error":"Password and confirmPassword didn't matched."
            })
        }
    let hashpassword=await bcrypt.hash(password,5)
       
       let newuser= new userModel({email,password:hashpassword}) 
    
         await newuser.save() 
    
         return res.status(200).json({
            "message":"User registerd successfully."
         }) 
    } catch (error) {
        return res.status(200).json({
            "error":error
         }) 
    }
    

})






//====================================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>.



userRoute.post(`/login`,async(req,res)=>{
const {email,password}=req.body
    try {
        let user=await userModel.findOne({email:req.body.email});

        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
              if(result){
                const  token = jwt.sign({ user: user.name }, 'hospital');

                res.status(200).send({
                    "msg":"Login successful.",
                    token:token
                })
              }

              else{
                res.status(403).send({
                    "error":err
                })
              }
            })
        }

        else{
            res.status(403).send({
                "msg":"Wrong Password"
            })
        }
    
  
    }
    catch(error){
        res.status(403).send({
            "error":error
        })
    }

})





module.exports = userRoute

