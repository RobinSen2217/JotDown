const mongoConnect=require('./db')  //importing the connecting function from db.js
require('dotenv').config({path: '../.env'})
const port=process.env.PORT || 5000
const express=require('express')
const app=express()
mongoConnect()                   //connecting to database
const cors=require('cors')
app.use(cors()) //needed so that frontend can fetch from API

//body parser middleware used to parse json req.body
app.use(express.json())

app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/notes',require('./routes/notesRoute'))

app.listen(port,()=>{
    console.log('app running successfully')
})