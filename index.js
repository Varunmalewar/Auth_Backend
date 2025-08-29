const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const cookieParser = require('cookie-parser')


const connectDB = require('./config/database');
connectDB();

//route import and mount 
const user = require('./routes/user');
app.use('/api/v1', user);



app.get('/',(req,res)=>{
    res.send("Hello World");
})





//activate the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});




