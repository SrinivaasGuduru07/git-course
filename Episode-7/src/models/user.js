const mongoose = require("mongoose");


//creating user schema.
const userSchema = mongoose.Schema({
    firstName :{
        type : String,
    },
    lastName : {
        type :String,
    },
    emailId : {
        type :String,
    },
    password :{
        type : String,
    },
    age : {
        type :String,
    },
    gender :{
        type : String,
    },
    
})

//creating a mogoose model.
module.exports = mongoose.model("User",userSchema);