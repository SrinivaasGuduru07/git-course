const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send("getting the data from the Data Base");
});

app.post("/user",(req,res)=>{
    
    res.send("saving the data to the Data Base");
})

//This will handle all the http method API calls to /test
app.use("/test",(req,res)=>{
    res.send("hello from the servere!!!")
})

app.listen(3000,()=>{
    console.log("Server Running successfully!!!!")
})