const express = require("express");

const connectDB=require("./config/database")

const User =require("./models/user")

const app = express();


app.post("/signup",async (req,res)=>{
    //creating a new instance of the User model

    const user = new User({
        firstName : "Virat",
        lastName : "Kholi",
        emailId : "virat@gmail.com",
        password : "kholi@123",

    });

    try {
        await user.save();
        res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }


})



connectDB()
    .then(()=>{
        console.log("Database connection has Established")
        app.listen(3000,()=>{
    console.log("server runing successfully listening on port 3000.....")
})
    })
    .catch((err)=>{
        console.error("Database cannot be connected")
    })







