const mongoose = require('mongoose');
const mongoURI="mongodb+srv://2dead1shot2:mongo%40123@cluster0.rs2bbl7.mongodb.net/cfg"

const connectToMongo=async()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected Successfully")
  }

module.exports=connectToMongo;