import React, { useState,useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from "../Context/notes/NoteContext.js"
import AlertContext from '../Context/alerts/AlertContext.js';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Dialog,
    DialogBody,
    Input,
    Textarea,
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Alert,
    Typography,
  } from "@material-tailwind/react";

function Notes() {

  const alerts=useContext(AlertContext)
  const {DelAlert,EditAlert}=alerts
  const [open,setOpen]=useState(false)
  const [errors, setErrors] = useState({})
  const allNotes=useContext(NoteContext)    
  const {notes,editNote,deleteNote,getAllNotes}=allNotes  //destructiuring the notes and from context object
  const nav=useNavigate()

useEffect(()=>{
if(localStorage.getItem('authtoken')){
  getAllNotes()
} else{
 nav('/login')
}
},[])

const handleColor=(tag)=>{
    if (tag==="Personal"){
        return 'bg-green-800'
    }else if (tag==="Work"){
        return 'bg-blue-800'
    }else{
        return 'bg-yellow-800'
    }
}

const [eformData, seteFormData] = useState({
  id:'',
    title: '',
    description: '',
tag:''
  })
const handleRadio=(e)=>{
  if(e.target.checked){
    seteFormData({
      ...eformData,tag:e.target.id[0].toUpperCase()+e.target.id.slice(1)
    })
  }

  }

  const handleOpen = () => {
    setOpen(!open)
  }
  const handleChange=(e)=>{
    const { name, value } = e.target;  //name= name attribute of element that triggered event and same with value
    seteFormData({
        ...eformData, [name]: value  //keep all formdata same but change the object key-value pais whose name matches with that of the field. also add new pair if name dont alread exist 
      }
      )
      
}

const handleEditSubmit=(e)=>{
  e.preventDefault() //so that page doesnt reload on form submission
  const validationErrors = {}

  if (!eformData.title.trim()) {
    validationErrors.title = "This is required"
  }else if (eformData.title.length < 4) {
    validationErrors.title = "Title should be at least 4 characters"
  } 

  if (!eformData.description.trim()) {
    validationErrors.description = "This is required"
  }else if (eformData.description.length < 5) {
    validationErrors.description = "Description should be at least 5 characters"
  }
  if (!eformData.tag.trim()) {
    validationErrors.tag = "Tag must be selected"
  }

  setErrors(validationErrors)

  if (Object.keys(validationErrors).length === 0) {
    editNote(eformData.id,eformData.title,eformData.description,eformData.tag)
    EditAlert()
    setOpen(!open)

  }
  else {
    setTimeout(() => {
          setErrors({})
        }, 3000);
  }

}
    return (
    <div className='flex flex-wrap my-5 justify-center items-center gap-x-5 gap-y-3 w-full'>
 
    <Dialog
    size="xs"
    open={open}
    handler={handleOpen}
    className="bg-transparent mx-auto w-full shadow-none"
  >
    <DialogBody>


          <form className='flex flex-col justify-evenly mx-auto gap-y-[10px] w-[400px] '>

            <Input maxLength={16} name="title" label='Title' variant='static' value={eformData.title} onChange={handleChange}  minLength={4}  color='purple' className='text-white placeholder:text-white'/>
            {errors.title ? <span className='text-red-300 font-serif'>{errors.title}</span>:<span> &nbsp; </span>}

             <Textarea name='description' variant='static' value={eformData.description} minLength={5} label='Description' onChange={handleChange} className='text-white placeholder:text-white ' color='purple' rows={4}/>
             {errors.description ? <span  className={`text-red-300 font-serif `}>{errors.description}</span>:<span> &nbsp; </span>}

             <Card className="w-full text-white bg-transparent shadow-none">
      <List className="flex-row text-white">
        <ListItem className="p-0 ">
          <label
            htmlFor="personal"
            className="  flex w-full text-white  cursor-pointer items-center px-3 py-2"
            
          >
            <ListItemPrefix className="mr-3">
              <Radio      
              onChange={handleRadio}
              color='green'
                name="horizontal-list"
                id="personal"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-white"
            >
              Personal
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="work"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
              onChange={handleRadio}
              color='blue'
                name="horizontal-list"
                id="work"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-white"
            >
              Work
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="other"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
              onChange={handleRadio}
              color='amber'
                name="horizontal-list"
                id="other"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                    className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-white"
            >
              Other
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
    {
    errors.tag ? <span className='text-red-300 font-serif'>{errors.tag}</span>:<span> &nbsp; </span>
    }
            <Button onClick={handleEditSubmit} type="submit" variant='gradient' color='deep-purple'>Edit Note</Button>
          </form>
              </DialogBody>
      </Dialog >
 
      {notes.length===0 ? <p className='text-center text-lg dark:text-white'>No notes to display.</p>:
       notes.map((note,ind)=>{
        return (
            <>
            <div key={ind} className='shadow-lg shadow-gray-800 p-5 w-[300px]  flex flex-col outline outline-gray-700/75 outline-1'>
 <div className='flex flex-nowrap justify-between'>
                <h1 className='font-semibold dark:text-white'>{note.title}</h1>
                <div>
                    <i onClick={()=>{
                      setOpen(!open)
                      seteFormData({id:note._id,title:note.title,description:note.description,tag:''})
                      // console.log(eformData)
                    }} 
                    className="fa-solid mr-4 fa-pen-to-square hover:cursor-pointer fa-lg"
                     style={{color: '#9900ff'}}>
                    </i>

                <i 
                onClick={()=>{
                  deleteNote(note._id)
                  DelAlert()
                }}
                 id={ind.toString()} 
                onMouseEnter={()=>{
document.getElementById(ind.toString()).classList.add('fa-beat-fade')
                }} 
                onMouseLeave={()=>{
                    document.getElementById(ind.toString()).classList.remove('fa-beat-fade')
                }} 
                className="fa-solid fa-trash fa-lg hover:cursor-pointer " 
                style={{color: '#ff0000'}}>

                </i>
                
 </div>
            </div>
                <p className='mt-3 break-words dark:text-white'>{note.description}</p>
                <span className={`${handleColor(note.tag)} text-white py-1 w-1/2 mt-3 text-center font-semibold text-md rounded-full `}>{note.tag}</span>
            </div>
            </>
        )
    })}
    </div>
  )
}

export default Notes
