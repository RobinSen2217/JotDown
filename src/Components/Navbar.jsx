import React, { useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useContext,useState } from 'react'
import { Alert } from '@material-tailwind/react'
import AlertContext from '../Context/alerts/AlertContext'

function Navbar() {
  const alerts=useContext(AlertContext)
 const system=window.matchMedia('(prefers-color-scheme:dark)') 
 const {addOpen,logOpen}=alerts
 const [dark,setDark]=useState(system.matches?'dark':'light')
  const location= useLocation()
  const toggleDark=()=>{
    if (dark!=='dark'){
      setDark('dark')
    }else{
      setDark('light')
    }
}
  useEffect(()=>{
switch (dark) {
  case 'dark':
    document.documentElement.classList.add('dark')
    document.body.style.backgroundColor='#000000'
    localStorage.setItem('theme', 'dark')
    break;
    case 'light':
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.body.style.backgroundColor='#ffffff'
      localStorage.setItem('theme', 'light')
  default:
    localStorage.removeItem('theme')
    break;
}
  },[dark])
  return (
    <div >
          <header id='nav' className="text-gray-600 bg-purple-800 shadow-lg  dark:shadow-gray-800  shadow-gray-500 body-font">
  <div className="container mx-auto flex flex-wrap py-4  flex-row items-center [@media(min-width:407px)]:justify-between justify-center ">
    <a className="flex title-font font-medium items-center justify-center text-gray-900 mb-0 max-[456px]:mx-auto">
   {/* <img src="/dadaLogo.png" alt="dadaLogo" className='min-[410px]:h-16 h-12'/> */}
      <p className="ml-3 text-lg min-[480px]:text-3xl font-semibold hover:cursor-pointer pr-2 ">JotDown</p>
    </a>
    <nav className="md:ml-auto max-[456px]:mx-auto flex flex-wrap gap-y-3 items-center text-white justify-center">
      <button id='mode' onClick={toggleDark} className={`py-1 w-10 ${location.pathname==='/signup'?'hidden':''} bg-purple-500 shadow-lg ml-2 mr-7 rounded-md`}>
        {dark==='light'?<i className={`fa-solid fa-moon`} style={{color: "#fff700"}}></i>:<i className={`fa-solid fa-sun`} style={{color: "#fff700"}}></i>}</button>
      <Link  className={`mr-7 hover:cursor-pointer hover:scale-150 hover:transition-all  ${location.pathname==='/'? 'underline decoration-red-600 text-red-500 decoration-[2px] scale-125 underline-offset-4  pointer-events-none':''} ${location.pathname==='/signup'?'hidden':''} ${location.pathname==='/login'?'hidden':''}`} to='/'>Home</Link>
      <Link to='/about' className={`mr-7 hover:cursor-pointe hover:scale-150 hover:transition-all ${location.pathname==='/about'? ' underline decoration-red-600 text-red-500 decoration-[2px] scale-125 underline-offset-4 font-semibold pointer-events-none':''} ${location.pathname==='/signup'?'hidden':''} ${location.pathname==='/login'?'hidden':''}`}>About</Link>
     {localStorage.getItem('authtoken')?<Link to='/login' onClick={()=>{localStorage.removeItem('authtoken')}} className=" hover:cursor-pointer bg-white text-red-500 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500  hover:text-white hover:border-white mr-3" >Logout</Link>:
     <><Link to='/login' className={`bg-blue-400 text-white hover:cursor-pointer hover:bg-blue-600 mr-7 rounded-lg px-3 py-1 ${location.pathname==='/login'? 'hidden':''}`}>Sign In</Link>
     <Link to='/signup' className={`bg-blue-400 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 px-3 mr-3 py-1 ${location.pathname==='/signup'?'hidden':''}`}>Sign Up</Link></>}
    </nav>

  </div>
</header>
<Alert variant='gradient' open={addOpen} className={`rounded-none z-50  left-0 right-0 absolute shadow-md shadow-green-200`} color='green' icon={<i className="fa-solid fa-thumbs-up" style={{color: '#ffffff'}}></i>}>
      Success: Note Added.
    </Alert>
    <Alert variant='gradient' open={logOpen} className='rounded-none absolute z-50 shadow-md shadow-red-200 right-0 left-0 ' color='red' icon={<i className="fa-solid fa-exclamation" style={{color: '#ffffff'}}></i>}>
      Login Failed. Please enter corrrect credentials.
    </Alert>
    </div>
  )
}

export default Navbar
