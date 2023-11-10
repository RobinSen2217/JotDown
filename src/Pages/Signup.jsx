import React from 'react'
import { Link } from 'react-router-dom'
import { Input } from "@material-tailwind/react";
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    let auth=null
    const [formData, setFormData] = useState({
        fname: '',
        lname:'',
        email: '',
        password: '',
        confirmPassword: ''
      })

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData, [name]: value
        })
       
      }


      const handleSubmit=(e)=>{
        e.preventDefault() //so that page doesnt reload on form submission
        const validationErrors = {}

        if(!formData.fname.trim()) {
        validationErrors.fname = "First Name is required"
    }

    if(!formData.lname.trim()) {
        validationErrors.lname = "Last Name is required"
    }
    if (!formData.email.trim()) {
        validationErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        validationErrors.email = "Email is not valid"
      }
  
      if (!formData.password.trim()) {
        validationErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        validationErrors.password = "Password <5 characters"
      }
  
      if (formData.confirmPassword !== formData.password) {
        validationErrors.confirmPassword = "Password not matched"
      }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
        //   addNote(formData.title,formData.description,formData.tag)
        axios.post('http://localhost:5000/api/auth/createuser',{
            "name":formData.fname+ ' '+formData.lname,
            "email":formData.email,
            "password":formData.password
          },{
            headers:{'Content-Type':'application/json'}
        }).then((res)=>{auth=res.data.authtoken
           localStorage.setItem('authtoken',auth)
        navigate('/')
    }).catch((err)=>{console.error(err);})
        }
        else {
          setTimeout(() => {
                setErrors({})
              }, 3000);
        }
}

  return (
    <div className='' style={{backgroundImage:"linear-gradient(115deg, #9F7AEA, #FEE2FE)"}}>
  <div className="min-h-screen pt-9" >
 <div className="container mx-auto">
   <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
     <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" 
     style={{backgroundImage: "url('https://w0.peakpx.com/wallpaper/957/429/HD-wallpaper-darklxxkgram-5-black-dark-library-lxxkgram.jpg')"}}>
       <h1 className="text-gray-300 text-3xl mb-3 font-semibold">Welcome</h1>
       <div>
         <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <Link to="#" className="text-purple-500 font-semibold hover:underline">Learn more</Link></p>
       </div>
     </div>
     <div className="w-full lg:w-1/2 py-9 px-12">
       <h2  className="text-3xl font-semibold mb-4">Register</h2>
       <p className="mb-4">
         Create your account. It’s free and only takes a minute.
       </p>
       <form>
         <div className="">
           <Input name='fname' color='purple' onChange={handleChange} label="Firstname" className="w-1/4"/>
           {errors.fname ? <span className='text-red-400 font-serif'>{errors.fname}</span>:<span> &nbsp; </span>}
         </div>
         <div className='mt-2'>
           <Input color='purple' name='lname' label="Surname" onChange={handleChange} className=" w-1/4"/>
           {errors.lname ? <span className='text-red-400 font-serif'>{errors.lname}</span>:<span> &nbsp; </span>}
         </div>
         <div className="mt-2">
           <Input color='purple' label="Email" name='email' className="" onChange={handleChange}/>
           {errors.email ? <span className='text-red-400 font-serif'>{errors.email}</span>:<span> &nbsp; </span>}
         </div>
         <div className="mt-2">
           <Input onChange={handleChange} name='password' color='purple' type="password" label="Password" className=""/>
           {errors.password ? <span className='text-red-400 font-serif'>{errors.password}</span>:<span> &nbsp; </span>}
         </div>
         <div className="mt-2">
           <Input color='purple' name='confirmPassword' onChange={handleChange} type="password" label="Confirm Password" className=" w-full "/>
           {errors.confirmPassword ? <span className='text-red-400 font-serif'>{errors.confirmPassword}</span>:<span> &nbsp; </span>}
         </div>
         <div className="mt-2">
           <Button variant='gradient' onClick={handleSubmit} color='deep-purple' className="w-full">Register Now</Button>
         </div>
       </form>
     </div>
   </div>
 </div>
</div>
</div>
  )
}

export default Signup
