import { useState,useContext } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";

function NoteState(props) {
  const host='http://localhost:5000/'
  const [notes,setNotes]=useState([])
  BASE_URL=process.env.BASE_URL
  
//Get all notes
const getAllNotes=() =>{
  axios.get(`${BASE_URL}api/notes/fetchallnotes/`,{ 
    headers: {
      'auth-token':localStorage.getItem('authtoken'),
    },
  }
  ).then((res)=>{const data = res.data
  setNotes(data)}) 
  .catch((err) => console.log(err))
}


    //Add Note
const addNote=(title,description,tag) =>{
 //adding note in backend db 
  axios.post(`${BASE_URL}api/notes/addnote`,{title,description,tag},{ 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('authtoken'),
    },
  }
  ).then((res)=>{
    const data = [res.data]     //adding note in frontend list for live additon without reload
    setNotes(notes.concat(data))  //add new note to list of notes
  }) .catch((err) => console.log(err))



}

    //Edit Note
const editNote=async(id,title,description,tag)=>{

  //editiong permanantly in backend
axios.put(`${BASE_URL}api/notes/updatenote/${id}`,{title,description,tag},{ 
    headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('authtoken'),
      },
    }
).then((res)=>{console.log('Edited successfully')}) .catch((err) => console.log(err))


//updating live in frontend
for (let index = 0; index < notes.length; index++) {
  const element = notes[index];
  if (element._id===id){  //if _id of note matches with the one sent by edit func call,then the details of that note will be edited an return back to the list
    element.title = title;
    element.description = description;
    element.tag = tag;
  }
}
}

    //Delete Note
const deleteNote=(id)=>{
  //deleting from backend db for permanant deletion
  axios.delete(`${BASE_URL}api/notes/deletenote/${id}`,{ 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('authtoken'),
    },
  }
  ).then((res)=>{console.log('Note Deleted')}) .catch((err) => console.log(err))


//deleting from frontend list for live delete without refetch/reload
const newNotes=notes.filter((note)=>{return note._id!==id}) //all the notes from notes variable having _id NOT same as id will remain in newNotes array. Also first parameter of filter is the single element from the array,just like map
setNotes(newNotes)
}

  return (
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getAllNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
