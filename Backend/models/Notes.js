//this file contains the schema for the notes model which will be exported 
const mongoose=require('mongoose')
const {Schema}=mongoose

const NotesSchema = new Schema({
    user:{    // this field is just like foreign key in SQl,used to connect the notes and users collections(or tables)
        type:mongoose.Schema.Types.ObjectId,  //the type is id like those stored in each document in th db
        ref:'users'   //referrancing the users collection,i.e.,the user field is the id taken from documents of users collections(i.e., the users)
    },
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },tag:{
        type:String,
        default:'general'
    },date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('notes',NotesSchema)  //'notes' is the collection name