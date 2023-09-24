const express= require('express');
const  connection  = require('./db');
const  userRoute  = require('./routes/userRoutes');
const doctorRoute = require('./routes/doctorRoutes');
const port =8080

const app= express()

app.use(express.json())

app.use("/user",userRoute)
app.use("/appointments",doctorRoute)
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to Backend Server")
})

app.listen(port,async()=>{
    try {
       await connection 
       console.log("Server is running on port " + port)
    } catch (error) {
        console.log(error)
    }
})