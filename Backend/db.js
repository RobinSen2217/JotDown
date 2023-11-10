
const mongoose=require('mongoose')
const mongoURI='mongodb://0.0.0.0:27017/JotDown'
const mongoConnect=async()=>{
    mongoose.connect(mongoURI,
        await console.log('connected to mongo successfully')   //awaiting completion of consequent action
    )
}

module.exports=mongoConnect