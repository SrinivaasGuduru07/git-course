const express = require("express");
const connectDB=require("./config/database")
const User =require("./models/user")
const app = express();
const {validateSignUpData} = require("./utils/validation")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    //creating a new instance of the User model
    const user = new User(req.body);
    try {

        await user.save();
        res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
})


//Get user by Emial
app.get("/user",async (req,res)=>{
    const userEmail =req.body.emailId;

    try{
        const users = await User.find({emailId : userEmail});

        if(users.length ===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Something Went Wrong");

    }
});

//Feed API - Get all the users from the database.
app.get("/feed" , async (req,res)=>{
    try{
        const users =await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Sonthing went wrong");
    }
})

//Delting the user from the database:

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
    //const user = await User.findByIdAndDelete({_id:userId});

    res.send("User deleted successfully");
        

    }
    catch(err){
        res.status(400).send("Sonthing went wrong");
    }
})

app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

try{


    const ALLOWED_UPDATES =["photoUrl","about","gender","age","skills"];

    const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );

    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length >10){
        throw new Error("skills cannot be more than 10");
    }

    const user=await User.findByIdAndUpdate({_id: userId }, data,{
            returnDocument : "after",
            runValidators : true,
    });
        console.log(user)
        res.send("User updated successfully"); 
    }
    catch(err){
        res.status(400).send("Something went wrong"+err.message);
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


