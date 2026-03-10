const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstName : {
        type :String,
        required : true,
        minLength : 4,
        maxLength : 10,
    },

    lastName : {
        type :String
    },

    emailId:{
        type :String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength :4,
        maxLength :30,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address:"+ value)
            }

        }

    },

    password : {
        type :String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password:"+ value)
            }

        }
    },

    age :{
        type: Number,
        min : 18,
    },

    gender :{
        type : String,
        //add the run validators at the patch api after the return document why becoz:update the gender for the existing user.
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender is not valid!!")
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
});

 

module.exports = mongoose.model("User",userSchema);