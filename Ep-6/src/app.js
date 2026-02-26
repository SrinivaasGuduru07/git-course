const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async (req,res)=>{


    //creating a new instance of the User Model.
    
    const user = new User({
        firstName : "akshay",
        lastname : "saini",
        emailId: "aksahy@gmail.com",
        password : "aksahy@123",
    });

   await user.save();
   res.send("User added successfully!!!");


})


connectDB().then(()=>{
    console.log("Database Connected Successfully!!!");

    app.listen(7777,()=>{
        console.log("Server Running successfully on 7777!!!!")
    })

})
.catch((err)=>{
    console.error("Database cannot be connected!!");
})

