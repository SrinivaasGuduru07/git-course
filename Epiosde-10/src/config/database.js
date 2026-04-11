const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://Admin:FWeMsq5U0S0tzaSv@namastenode.vb705sw.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

/*
const mongoose = require("mongoose");

const connectDB = async ()=>{

    await  mongoose.connect("url/devTiner")
    }


module.exports = connectDB;
 */

