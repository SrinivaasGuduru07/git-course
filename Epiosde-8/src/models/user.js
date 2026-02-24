const mongoose = require("mongoose");
const validator = require("validator");



//creating user schema.
const userSchema = mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        minLength : 4,
        maxLength :10,
    },
    lastName : {
        type :String,
    },
    emailId : {
        type :String,
        required : true,
        trim :true,
        lowercase : true,
        minLength :4,
        maxLength :30,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address:"+ value)
            }

        }
    },
    password :{
        type : String,
        required :true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password:"+ value)
            }

        }
    },
    age : {
        type :Number,
        min :18,
    },
    gender :{
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid!!");
            }
        }
    },
    photoUrl:{
        type : String,
        default :"https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/", 
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL:"+ value)
            }

        },
        
    },
    about : {
        type : String,
        default : "This is a default about of the User",

    },
    skills:{
        type : [String],
    }
    
},{
    timestamps : true,
})

//creating a mogoose model.
module.exports = mongoose.model("User",userSchema);