
const mongoose =require("mongoose")
const doctorSchema= mongoose.Schema({

    name:{type:String, required:true},
    image:{type:String,required:true},
    specialization:{type:String, required:true},
    experience:{type:String, required:true},
    location:{type:String, required:true},
    date:{type:Date, required:true},
    slots:{type:Number, required:true},
    fee:{type:Number, required:true},
   
},{
    versionkey:false
})


const doctorModel =mongoose.model("doctor",doctorSchema)

module.exports = doctorModel