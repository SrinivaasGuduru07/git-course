const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const {validateSignUpData} = require("./utils/validation")
//To create the Encryption password
const bcrypt = require("bcrypt");
//importing the cookie parser:
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const user = require("./models/user");
const {userAuth} = require("./middlewares/auth");

//making the json object into javascript object that has come from the postman.
app.use(express.json());
app.use(cookieparser())

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
        res.send("User Added Successfully!!!")
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }

})

app.post("/login",async(req,res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password)
    if(isPasswordValid){

        const token= await user.getJWT(); 



        res.cookie("token",token ,{
            expires: new Date(Date.now()+8 * 3600000)
        });
        res.send("Login Successful!!!");
    }else{
            throw new Error("Invalid Credentials");
    }
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

app.get("/profile",userAuth ,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

app.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user = req.user;
    //sending the connection request.
    
    res.send(user.firstName+ "has sent the connection request");
})

connectDB().then(()=>{
    console.log("Database connected sucessfully!!")

    app.listen(7777,()=>{
        console.log("Server Running successfully!!!");
    })
})
.catch((err)=>{
    console.error("database not connected!!")
})


/*
creating the JWT token and adding to the cookie in the Login API and checking whethere the cookie is coming from the server and recvied at browser or not:


app.post("/login",async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
        const token= await jwt.sign({_id:user._id}, "DEV@Tinder$790")
        res.cookie("token",token);
        res.send("Login Successful!!!");
    }else{
            throw new Error("Invalid Credentials");
    }
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

app.get("/profile",async(req,res)=>{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token,"DEV@Tinder$790");
    console.log(decodedMessage);
    const {_id} = decodedMessage;
    console.log("loggedIn User:"+ _id);
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User does not Exist!!")
    }
    res.send(user);
})
 */