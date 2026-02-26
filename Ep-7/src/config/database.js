const mongoose = require("mongoose");

const connectDB = async ()=>{

    await mongoose.connect("mongodb+srv://Admin:FWeMsq5U0S0tzaSv@namastenode.vb705sw.mongodb.net/Tinder-project");

}

module.exports = connectDB;


