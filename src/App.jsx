import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home';
import NoteState from './Context/notes/NoteState';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AlertState from './Context/alerts/AlertState';
import Error from './Pages/Error';

export default function App() {
  return (
    <>
    <NoteState>  {/* making state available in all files */}
    <AlertState>
    <Router>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<><Home/></>}/>
    </Routes>
    <Routes>
    <Route exact path='/login' element={<><Login/></>}/>
    </Routes>
    <Routes>
    <Route exact path='/signup' element={<><Signup/></>}/>
    </Routes>
    {/* <Routes>
    <Route exact path='/err' element={<><Error/></>}/>
    </Routes> */}
    </Router>
    </AlertState>
    </NoteState>
    </>
  )
}
