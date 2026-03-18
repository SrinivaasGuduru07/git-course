const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");


app.use(express.json())

app.post("/signup",async(req,res)=>{

    try{
    validateSignUpData(req);

    const {firstName,lastName,emailId,password}= req.body;

    const passwordHash = await bcrypt.hash(password,10);
    console.log(password);

    const user = new User({
        firstName,lastName,emailId,
        password:passwordHash,
    })

    await user.save();
    res.send("user saved succesfully!!");
    }catch(err){
         res.status(400).send("Error saving the user:"+err.message);
    }

})


//login creation

app.post("/login",async(req,res)=>{
    try{
    const{emailId,password}= req.body;
    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("invalid credentials")
    }
        //compare the password from req.body and the user.password stored in the DB.
        //here the user.pwd means we have found the emailId in the DB
        //that DB passwor and the password cmg from the req.body.
    const isPasswordValid = await user.validatePassword(password)
    if(isPasswordValid){

        const token = await user.getJWT();

        res.cookie("token",token);
            res.send("Login Successful!!!");
        }
    else{
        throw new Error("invalid credential")
    }
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})


app.get("/profile",async(req,res)=>{
    const {emailId} = req.body;
    try{
        const user = await User.findOne({emailId:emailId})
        if(user.length === 0){
            throw new Error("user not found")
        }else{
            res.send(user)
        }
    }    catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})









connectDB().then(()=>{
    console.log("Database connected sucessfully!!")

    app.listen(3000,()=>{
        console.log("Server Running successfully!!!");
    })
})
.catch((err)=>{
    console.error("database not connected!!")
})



/*

//update data of the user data:

app.patch("/user/:userId",async(req,res)=>{//pass the userid at the ulr of the patch like this :/user/1213#1231m1jwjdnwinfu
    const userId=req.params.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("update not allowed");
    }
    if(data.skills.length > 10){
        throw new Error("Skills cannot be more than 10")
    }

        const user = await User.findByIdAndUpdate({_id:userId},data,{
            runValidators : true,
            returnDocument : "after",
        });
        res.send("user updated successfully!!!")
    }catch(err){
        res.status(400).send("UPDATE FAILED:"+err.message)
    }
})
 */

/*
app.post("/signup",async (req,res)=>{
    try{
        //validation of data
        validateSignUpData(req);
        //encrypt the user password
        const {firstName , lastName , emailId , password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);
        //creating a new instance of the User Model.
    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });
        await user.save();
        res.send("User Added Successfully!!!")}
    catch(err){res.status(400).send("Error saving the user:"+err.message)}
})


app.post("/login",async(req,res)=>{
    try{
        const {emailId ,password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid Credentials");
        }
        //compare the password from req.body and the user.password stored in the DB.
        //here the user.pwd means we have found the emailId in the DB
        //that DB passwor and the password cmg from the req.body.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successful!!!");
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})



//get one user by using the emailId:
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
       const users = await User.find({emailId:userEmail});

       if(users.length === 0){
        res.status(404).send("User not found")
       }
       else{
            res.send(users);
       }

    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

 */
