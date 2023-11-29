const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET 

const fetchUser=(req,res,next)=>{
//Retrieve user from token and add the id to req object
const token=req.header('auth-token')   //extracting token value from a request header named 'auth-token' that comes with the fetch post request
if (!token){
    return res.status(400).json({error:'Please authenticate using valid token'})
}
try{
    const decodedPayload=jwt.verify(token,JWT_SECRET)     //verifying if token is genuine and pure,and then the decoded payload is reutrned
    req.id=decodedPayload.id    //id in request object is given value of id from decoded payload
    next()                     //next funtion after middleware is called,that is the async(req,res) callback function 
}catch(err){
    res.status(401).json({error:'Please authenticate using valid token'})
}
}

module.exports=fetchUser