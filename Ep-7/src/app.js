const express = require("express");
const connectDB = require ("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup",async (req,res)=>{


    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added succesfully");
    }
    catch(err){
        res.status(400).send("Error saving the user:"+ err.message);
    }
});

app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId:userEmail});

        res.send(user);
    }
    catch(err){
         res.status(400).send("Somehtin went wrong!!");
    }

    
})

//feed api- get /feed -get all the users from User database.
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Somehtin went wrong!!");
    }
})

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;

    try{
    const user = await User.findByIdAndDelete(userId);

    res.send("User Deleted Successfully");
    }
    catch(err){
         res.status(400).send("Somehtin went wrong!!");
    }
})

//Update the user data:
app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;

    try{
        await User.findByIdAndUpdate({ _id:userId},data,{
            returnDocument : "before"}
        );
        res.send("user updated successfully!!!");
    }
    catch(err){
         res.status(400).send("Somehtin went wrong!!");
    }
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

