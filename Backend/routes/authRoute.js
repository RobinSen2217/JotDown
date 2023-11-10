const express=require('express')
const router = express.Router()
const User=require('../models/Users')  //importing user model
const {body,validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET='rdxSkullShot'   //creating our secret for jwt
const fetchUser=require('../middlewares/fetchUser')

//ROUTE1
//sign up:No login reqd
router.post('/createuser',[
    body('name').isLength({min:4}),
    body('email','Please enter valid email').isEmail(),
    body('password','Please enter strong password atleast having 5 characters').isLength({min:5})
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try{
        let user=await User.findOne({email:req.body.email})  //checking if user with email already exists
        if (user){       //handling if user with email already exists
            return res.status(400).json({error:'Sorry, User with email already exists'}) //return is used so if this runs,it doesn't reach underlying code
        }

        //create a new user
        const salt=await bcrypt.genSalt(10)    //creating salt
        const secPass=await bcrypt.hash(req.body.password,salt)    //creating secure password  by combining user entered paas with salt and then hashed
        user=User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const payload={                    //payload data that will be used to find user from token
            id:user.id
        }
        const authtoken=jwt.sign(payload,JWT_SECRET)    //creating authtoken
        res.status(200).json({authtoken})              //sending authtoken as json response back to browser
    }catch(err){
        res.status(500).send('Some error occured')
    }
})

//ROUTE2
//login:No login reqd
router.post('/login',[
    body('email','Please enter valid Email').isEmail(),
    body('password','Password cannot be blank').exists()
],async(req,res)=>{
    try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
        const {email,password}= req.body
        let user=await User.findOne({email})  //checking if user with email already exists
        if (!user){       //handling if user with email DOESN'T exist
            return res.status(400).json({error:'Please login with correct credentials'}) //return is used so if this runs,it doesn't reach underlying code
        }
        const passwordCompare= await bcrypt.compare(password,user.password)  //comparing password(1st arg) entered and password hash stored in db(2nd arg)

        if (!passwordCompare){    //handling if password entered doesn't match
    return res.status(400).json({error:'Please login with correct credentials'}) //return is used so if this runs,it doesn't reach underlying code
        }
        const payload={                    //payload data that will be used to find user from token
            id:user.id
        }
        const authtoken=jwt.sign(payload,JWT_SECRET)    //creating authtoken
        res.status(200).json({authtoken})              //sending authtoken as json response back to browser
    }catch(err){
        res.status(500).send('Internal server error occured')
    }

})

//ROUTE3
//Getting logged in user's details:Login reqd
router.post('/getuser',fetchUser,async(req,res)=>{  //fetchUser is imported and used as middleware from fetchUser.js 
try{
const userId=req.id   //this req.id is given value of decodedPayload.id in fetchUser middleware 
const user =await User.findById(userId).select('-password')  //user is found using id and all data of our desired user except password(as '-' is used in select() fucntion) is stored in user variable
res.status(200).send(user)    //the retrieved data is sent as response
}catch(err){
    res.status(500).send('Internal server error occured')
}
})

module.exports=router