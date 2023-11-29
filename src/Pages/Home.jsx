import React, { useState,useContext } from 'react'

import NoteForm from '../Components/NoteForm.jsx'
import Notes from '../Components/Notes.jsx'
import AlertContext from '../Context/alerts/AlertContext.js';
import { Alert } from '@material-tailwind/react';

function Home() {
  const alerts=useContext(AlertContext)
  const {editOpen,delOpen}=alerts

  return (
    <>
    
    < div className='mx-5'>
    <h1 className='text-5xl font-bold mt-5 text-center dark:text-white '>Add a new Note</h1>
    <NoteForm/>
  
    <hr
      className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-[20px] dark:opacity-100 dark:from-transparent dark:via-white dark:to-transparent"
    />
        <Alert variant='gradient' open={editOpen} className={`rounded-none z-50  left-0 right-0 absolute shadow-md shadow-green-200`} color='green' icon={<i class="fa-solid fa-thumbs-up" style={{color: '#ffffff'}}></i>}>
      Success: Note Edited.
    </Alert>
       <Alert variant='gradient' open={delOpen} className={`rounded-none z-50 absolute left-0 right-0`} color='green' icon={<i class="fa-solid fa-thumbs-up" style={{color: '#ffffff'}}></i>}>
      Success: Note Deleted.
    </Alert>
    <h1 className='text-5xl font-bold text-center dark:text-white'>Your Notes</h1>
    <div className=''>
    <Notes/>
    </div>
    </div></>
  )
}

export default Home
