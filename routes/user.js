const express = require('express');
const router = express.Router();

const{signup, login} = require('../controller/auth');
const {Auth , isStudent , isAdmin} = require('../middleware/authmidd')

router.post('/signup', signup);
router.post('/login', login);





//testing protected route
router.get('/test',Auth,(req,res)=>{
    res.send({
        success:true,
        message : "welcome to the Protected route for test"
    })})
//Protected route
router.get('/student',Auth,isStudent , (req,res)=>{
    return res.status(201).json({
        success:true,
        message : "welcome to the Protected route for students"
    })
})

router.get('/admin',Auth,isAdmin,(req,res)=>{
    res.status(201).json({
        success:true,
        message : "welcome to the Protected route for admin"
    })})

module.exports = router;