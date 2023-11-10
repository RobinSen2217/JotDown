const mongoConnect=require('./db')  //importing the connecting function from db.js
mongoConnect()                   //connecting to database

const express=require('express')
const app=express()
const port=5000

const cors=require('cors')
app.use(cors()) //needed so that frontend can fetch from API

//body parser middleware used to parse json req.body
app.use(express.json())

app.use('/api/auth',require('./routes/authRoute'))
app.use('/api/notes',require('./routes/notesRoute'))

app.listen(port,()=>{
    console.log('app running successfully')
})