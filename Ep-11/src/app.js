const express = require("express");
const connectDB = require("./config/database");
const app = express();
//Episode-10
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")





app.use(express.json());//converting the json data into js object and save it on the database.
app.use(cookieParser());//To read the value of the cookie need of Cookie Parser.

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


connectDB().then(()=>{
    console.log("Database connected sucessfully!!")

    app.listen(3000,()=>{
        console.log("Server Running on 3000 successfully!!!");
    })
})
.catch((err)=>{
    console.error("database not connected!!")
})

