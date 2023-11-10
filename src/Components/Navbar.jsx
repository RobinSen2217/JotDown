import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { Alert } from '@material-tailwind/react'
import AlertContext from '../Context/alerts/AlertContext'

function Navbar() {
  const alerts=useContext(AlertContext)
  const {addOpen,logOpen}=alerts

  const location= useLocation()

  return (
    <div >
          <header id='nav' className="text-gray-600 bg-purple-800 shadow-lg  shadow-gray-500 body-font">
  <div className="container mx-auto flex flex-wrap py-4  flex-row items-center justify-between">
    <a className="flex title-font font-medium items-center text-gray-900 mb-0 max-[456px]:mx-auto">
   {/* <img src="/dadaLogo.png" alt="dadaLogo" className='min-[410px]:h-16 h-12'/> */}
      <Link to='/' className="ml-3 text-lg min-[480px]:text-3xl font-semibold hover:cursor-pointer pr-2">JotDown</Link>
    </a>
    <nav className="md:ml-auto max-[456px]:mx-auto flex flex-wrap items-center text-white justify-center">
      <Link  className={`mr-7 hover:cursor-pointer hover:scale-150 hover:transition-all  ${location.pathname==='/'? 'underline decoration-red-600 text-red-500 decoration-[2px] scale-125 underline-offset-4  pointer-events-none':''}`} to='/'>Home</Link>
      {/* <Link to='/user' className="mr-5 hover:text-gray-900 hover:cursor-pointer" >Agents</Link> */}
      <Link to='/about' className={`mr-7 hover:cursor-pointe hover:scale-150 hover:transition-all ${location.pathname==='/about'? ' underline decoration-red-600 text-red-500 decoration-[2px] scale-125 underline-offset-4 font-semibold pointer-events-none':''}`}>About</Link>
     {localStorage.getItem('authtoken')?<Link to='/login' onClick={()=>{localStorage.removeItem('authtoken')}} className=" hover:cursor-pointer bg-white text-red-500 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white hover:border-white" >Logout</Link>:
     <><Link to='/login' className={`bg-blue-400 text-white hover:cursor-pointer hover:bg-blue-600 mr-7 rounded-lg px-3 py-1 ${location.pathname==='/login'? 'hidden':''}`}>Sign In</Link>
     <Link to='/signup' className={`bg-blue-400 rounded-lg text-white hover:cursor-pointer hover:bg-blue-600 px-3 py-1 ${location.pathname==='/signup'?'hidden':''}`}>Sign Up</Link></>}
    </nav>

  </div>
</header>
<Alert variant='gradient' open={addOpen} className={`rounded-none z-50  left-0 right-0 absolute shadow-md shadow-green-200`} color='green' icon={<i class="fa-solid fa-thumbs-up" style={{color: '#ffffff'}}></i>}>
      Success: Note Added.
    </Alert>
    <Alert variant='gradient' open={logOpen} className='rounded-none absolute z-50 shadow-md shadow-red-200 right-0 left-0 ' color='red' icon={<i class="fa-solid fa-exclamation" style={{color: '#ffffff'}}></i>}>
      Login Failed. Please enter corrrect credentials.
    </Alert>
    </div>
  )
}

export default Navbar
