
const mongoose=require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
// const mongoURI='mongodb://0.0.0.0:27017/JotDown'
const mongoConnect=async()=>{
    mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true },
        await console.log('connected to mongo successfully')   //awaiting completion of consequent action
    )
}

module.exports=mongoConnect