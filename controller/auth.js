const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Import JWT for token generation
require('dotenv').config();

// Signup controller
exports.signup = async (req,res)=>{
    
    try{
        const {username, email, password, role} = req.body;
        //check if user already exists
        const  existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists",success:false});
        }

        //hash the password before saving
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({message:"Error in hashing password",success:false});
        }
        const user = new User({
            username,
            email,
            password:hashedPassword,
            role
        });
        await user.save();
        return res.status(201).json({message:"User created successfully",success:true});

   
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Error in signup",success:false});

    }
}



exports.login = async (req, res)=>{
    try{
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(400).json({message:"Please provide all required fields",success:false});
        }

        //checl if user exists 
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        //check password
        const isMatch = await bcrypt.compare(password,user.password)
        const payload ={
            email: user.email,
            role: user.role,
            id : user._id
        }

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials",success:false});}
        else{

            let token = jwt.sign({payload}, process.env.JWT_SECRET, {expiresIn:'1h'});

            console.log(user)
            user.token = token; // Store the token in the user object (optional)
            console.log(user)
         
            user.password = undefined; // Exclude password from the response
            console.log(user)
            const options ={
                expiresIn : new Date(Date.now()+3*24*60*60*1000),       // 3 days
                httpOnly:true      // client side script cannot access the cookie
            }
            return res.status(200).cookie('varunCookie',token,options).json({
                success:true,
                token,
                user,
                message:"Login successful"
            })

         
          
           
        }

    

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Error in login",success:false});

    }
}



