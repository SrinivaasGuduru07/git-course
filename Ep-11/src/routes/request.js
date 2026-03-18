const express = require("express");

const requestRouter = express.Router();


//import the user Auth middleware.
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    const user = req.user;
    //Sending a connection request:

    console.log("Sending the connection request!!!")

    res.send(user.firstName + "sent the connection request!!!")
})


module.exports=requestRouter;