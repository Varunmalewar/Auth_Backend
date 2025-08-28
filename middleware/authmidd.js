// Auth , isStudent , isAdmin

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth = (req,res,next)=>{
    try{
        //extract the jwt token from body
        console.log("Request headers:", req.headers);
        console.log("Request body:", req.body);
        console.log("Request cookies:", req.cookies);
        
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Token Missing"
            })
        }
        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log("Decoded token:", decode);
            req.user = decode; // isse humne req.user ke andar payload ko store kar diya hai 
        }catch(err){
            console.log("Token verification error:", err);
            return res.status(401).json({
                success:false,
                message :'token is invalid'
            })

        }
        next();


    }
    catch(err){
        console.log("Auth middleware error:", err);
        return res.status(401).json({
            success : false,
            message:"Something went wrong, while verifying token"
        })


    }


}


exports.isStudent = (req,res,next)=>{
    try{
        console.log("User in isStudent middleware:", req.user);
        if(req.user.role !== "student"){
            return res.status(401).json({
                success : false,
                message : "This is protected route of student"
            })
        }
        next();
    }
    catch(err){
        console.log("isStudent middleware error:", err);
        return res.status(501).json({
            success : false ,
            message  : "User role is not matching"
        })

    }
}


exports.isAdmin = (req,res,next)=>{
     try{
        console.log("User in isAdmin middleware:", req.user);
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success : false,
                message : "This is protected route of Admin"
            })
        }
        next();
    }
    catch(err){
        console.log("isAdmin middleware error:", err);
        return res.status(501).json({
            success : false ,
            message  : "User role is not matching"
        })

    }

}
