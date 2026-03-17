const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
//episode-9
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");
//Episode-10
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
//import the user Auth middleware.
const {userAuth} = require("./middlewares/auth");


app.use(express.json());//converting the json data into js object and save it on the database.
app.use(cookieParser());//To read the value of the cookie need of Cookie Parser.

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
        const {emailId ,password} = req.body;

        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid Credentials");
        }
        //Calling the ValidatePassword
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            //Creating a JWT token.
            //Calling the getJWT function
            const token = await user.getJWT();
            //console.log(token);

            //Add the token to cookie and send the response back to the user.
            res.cookie("token",token,{
                expires : new Date(Date.now()+ 8 * 3600000),
            });
            res.send("Login Successful!!!");
            
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

app.get("/profile",userAuth, async (req,res)=>{
    try{
    const user = req.user;
    res.send(user)
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

//sending the Connection Request:
app.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    const user = req.user;
    //Sending a connection request:

    console.log("Sending the connection request!!!")

    res.send(user.firstName + "sent the connection request!!!")
})





connectDB().then(()=>{
    console.log("Database connected sucessfully!!")

    app.listen(3000,()=>{
        console.log("Server Running on 3000 successfully!!!");
    })
})
.catch((err)=>{
    console.error("database not connected!!")
})

