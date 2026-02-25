const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

//Handling the Auth Middleware for all the get,post,delete request.

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/user",userAuth, (req,res)=>{
    res.send("User Data has Sent");
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
})

app.get("/admin/deleteAllData",(req,res)=>{
    res.send("Deleted a user");
})

app.listen(3000,()=>{
    console.log("Server Running successfully!!!!")
})