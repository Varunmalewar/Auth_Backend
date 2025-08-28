const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed", err);


    }
}
module.exports = connectDB;