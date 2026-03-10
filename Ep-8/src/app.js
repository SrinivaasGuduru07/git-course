const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json())

app.post("/signup",async (req,res)=>{
    //creating a new instance of the User Model.
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User Added Successfully!!!")
    }
    catch(err){
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

//get all the users:by using the /feed api://dont pass any data in postman
app.get("/feed",async (req,res)=>{
    try{
        const users =await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("Error saving the user:"+err.message)
    }
})

//deleting an user from the data base by using the userId:
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!")
    }
    catch(err){
        res.status(400).send("Error saving the user:"+err.message)
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
