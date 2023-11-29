import React from 'react'
import { useContext } from 'react'
import NoteContext from "../Context/notes/NoteContext.js"
import { useState } from 'react';
import { Input } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import {Alert} from '@material-tailwind/react';
import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
  } from "@material-tailwind/react";

import AlertContext from '../Context/alerts/AlertContext'

function NoteForm() {

  const alerts=useContext(AlertContext)
  const {AddAlert}=alerts

    const allNotes=useContext(NoteContext)    
    const [errors, setErrors] = useState({})
    const {notes,addNote}=allNotes
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    tag:''
      })
     


    const handleChange=(e)=>{
        const { name, value } = e.target;  //name= name attribute of element that triggered event and same with value
        setFormData({
            ...formData, [name]: value  //keep all formdata same but change the object key-value pais whose name matches with that of the field. also add new pair if name dont alread exist 
          }
          )
         
    }
    const handleSubmit=(e)=>{
        e.preventDefault() //so that page doesnt reload on form submission
        const validationErrors = {}

        if (!formData.title.trim()) {
          validationErrors.title = "This is required"
        }else if (formData.title.length < 4) {
          validationErrors.title = "Title should be at least 4 characters"
        } 

        if (!formData.description.trim()) {
          validationErrors.description = "This is required"
        }else if (formData.description.length < 5) {
          validationErrors.description = "Description should be at least 5 characters"
        }
        if (!formData.tag.trim()) {
          validationErrors.tag = "Tag must be selected"
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
          addNote(formData.title,formData.description,formData.tag)
  AddAlert()
document.getElementById('title').value=''
document.getElementById('description').value=''
document.getElementById('Personal').checked=false
document.getElementById('Work').checked=false
document.getElementById('Other').checked=false
  setFormData({
    title: '',
    description: '',
tag:''
    })
        }
        else {
          setTimeout(() => {
                setErrors({})
              }, 3000);
        }
  

}

    const handleRadio=(e)=>{
      if(e.target.checked){
        setFormData({
          ...formData,tag:e.target.id
        })
      }
    }
  return (
    <>
   
    <div>
        <form  className=' mt-2 grid grid-rows-7 grid-cols-1 justify-evenly mx-auto  [@media(min-width:746px)]:w-1/2 [@media(min-width:319px)]:w-2/3 w-5/6'>
    <Input maxLength={16} id='title' name='title' color='purple' onChange={handleChange}  variant="outlined" label="Title" className=' bg-transparent dark:text-white'/>
    {errors.title ? <span  className='text-red-400 font-serif'>{errors.title}</span>:<span> &nbsp; </span>}
    <Textarea name='description' id='description' color='purple' size="lg"  onChange={handleChange} label="Description" className='dark:text-white bg-transparent ' rows={8}/>
    {errors.description ? <span id='descErr' className={`text-red-400 font-serif `}>{errors.description}</span>:<span> &nbsp; </span>}



    <Card className="w-full bg-transparent">
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="Personal"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio      
              onChange={handleRadio}
              color='green'
                name="horizontal-list"
                id="Personal"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              Personal
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="Work"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
              onChange={handleRadio}
              color='blue'
                name="horizontal-list"
                id="Work"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              Work
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="Other"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
              onChange={handleRadio}
              color='amber'
                name="horizontal-list"
                id="Other"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                    className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              Other
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
    {
    errors.tag ? <span className='text-red-400 font-serif'>{errors.tag}</span>:<span> &nbsp; </span>
    }
   
   
    <Button color='deep-purple' onClick={handleSubmit} variant="gradient">Add Note</Button>

    </form>
    </div></>
  )
}

export default NoteForm
