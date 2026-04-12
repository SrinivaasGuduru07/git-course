const express = require("express");
const app = express();

const connectDB = require("./config/database");
const cookieparser = require("cookie-parser");



app.use(express.json());
app.use(cookieparser())

const authRouter = require("./routes/auth");

const profileRouter = require("./routes/profile");

const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
 

connectDB().then(()=>{
    console.log("Database connected sucessfully!!")

    app.listen(7777,()=>{
        console.log("Server Running successfully!!!");
    })
})
.catch((err)=>{
    console.error("database not connected!!")
})


