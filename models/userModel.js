const mongoose =require("mongoose")
const userSchema= mongoose.Schema({

    email:{type:String, required:true},
    password:{type:String,required:true},
    
   
},{
    versionkey:false
})


const userModel =mongoose.model("user",userSchema)

module.exports = userModel