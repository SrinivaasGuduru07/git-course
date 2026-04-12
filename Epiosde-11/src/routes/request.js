const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user = req.user;
    //sending the connection request.
    
    res.send(user.firstName+ "has sent the connection request");
})

module.exports = requestRouter;
