const express=require('express')
const fetchUser = require('../middlewares/fetchUser')
const router = express.Router()
const Note=require('../models/Notes')
const {body,validationResult}=require('express-validator')  //used whenever we're adding things to db,we need validator to validate the input

//ROUTE 1
//Get all the notes: Login reqd
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try{const notes=await Note.find({user:req.id}) //since note can be multiple,we use find() instead of findOne() and recieve all notes in an array. we again use the modified id in req.id that is verified and connected to our specific user in fetchUser middleware
    res.status(200).send(notes)}catch(err){
        res.status(500).send('Internal server error occured')
    }
})


//ROUTE 2
//Add new note: Login reqd
router.post('/addnote',fetchUser,[
    body('title').isLength({min:4}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
],async (req,res)=>{
    try{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
        const {title,description,tag}= req.body
        const note=await Note.create({
            title,
            description,
            tag,
            user: req.id  //req.id is given value by fetchuser middleware which is passed to user as foreign key
        })
    res.status(200).send(note)
}catch(err){
    res.status(500).send('Internal server error occured')
}
})

//ROUTE 3
//Update note: Login reqd
router.put('/updatenote/:id',fetchUser,async (req,res)=>{      // the id in'/:id' is value for req.params.id that is the id of the note NOT the user
    try{
        const {title,description,tag}= req.body

        const newNote={}  //creating new note object

        if(title){        //if title is part of the update request body and not empty,then we set update/newNote title equal to current title
        newNote.title = title
       }
       if(title){       //if description is part of the update request body and not empty,then we set update/newNote description equal to current description
        newNote.description = description
       } if(title){        //if tag is part of the update request body and not empty,then we set update/newNote title equal to current tag
        newNote.tag = tag
       }

       //Find note to be updated and update it
       let note=await Note.findById(req.params.id)   // the id in'/:id' is value for req.params.id that is the id of the note NOT the user
       if (!note) {
        return res.status(404).send('Note not found')
       }

       if (note.user.toString()!==req.id){   //comparing note id with req.id given by fetchuser middleware,i.e,checking if user wanting to update is original user/owner of note/account
        return res.status(401).send('Not Allowed')
       }

       //after confirming user and note,we now update the note
       note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.status(200).json(note)  //sending updated note
}catch(err){
    res.status(500).send('Internal server error occured')
}
})

//ROUTE 4
//Delete note: Login reqd
router.delete('/deletenote/:id',fetchUser,async (req,res)=>{      // the id in'/:id' is value for req.params.id that is the id of the note NOT the user
    try{
       //Find note to be deleted and delete it
       let note=await Note.findById(req.params.id)   // the id in'/:id' is value for req.params.id that is the id of the note NOT the user
       if (!note) {
        return res.status(404).send('Note not found')
       }

       if (note.user.toString()!==req.id){   //comparing note id with req.id given by fetchuser middleware,i.e,checking if user wanting to update is original user/owner of note/account
        return res.status(401).send('Not Allowed')
       }

       //after confirming user and note,we now delete the note
       note=await Note.findByIdAndDelete(req.params.id)
    res.status(200).json({"Success":"Note has been deleted",note})  //sending deleted note
}catch(err){
    res.status(500).send('Internal server error occured')
}
})


module.exports=router