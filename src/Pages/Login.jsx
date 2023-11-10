import React from 'react'
import { Input } from "@material-tailwind/react"
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { useContext } from 'react'
import AlertContext from '../Context/alerts/AlertContext'


function Login() {
  const navigate = useNavigate()
  BASE_URL=process.env.BASE_URL
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  let auth = null
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
   
  }
  const handleSubmit=(e)=>{
    e.preventDefault() //so that page doesnt reload on form submission
    const validationErrors = {}

   
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

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
    axios.post(`${BASE_URL}api/auth/login`,{
        "email":formData.email,
        "password":formData.password
      },{
        headers:{'Content-Type':'application/json'}
    }).then((res)=>{
      auth=res.data.authtoken
        localStorage.setItem('authtoken', auth)
    navigate('/')
}).catch((err)=>{

 LogAlert()
})
    }
    else {
      setTimeout(() => {
            setErrors({})
          }, 3000);
    }
}

const alerts=useContext(AlertContext)
const {LogAlert}=alerts

  return (
    <>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy underline-offset-4">
           Sign in
        </h1>
        <form className="mt-6">
            <div className="mb-2">
                <Input onChange={handleChange}
            color='purple'
            label='Email'
            name='email'
                />
                   {errors.email ? <span className='text-red-400 font-serif'>{errors.email}</span>:<span> &nbsp; </span>}
            </div>

            <div className="mb-2">
                <Input onChange={handleChange}
                 label='Password'
                    type="password"
                    name='password'
                   color='purple'
                />
                {errors.password ? <span className='text-red-400 font-serif'>{errors.password}</span>:<span> &nbsp; </span>}
            </div>
            {/* <a
                href="#"
                className="text-xs text-purple-600 hover:underline"
            >
                Forget Password?
            </a> */}
            <div className="mt-6">
                <Button variant='gradient' onClick={handleSubmit} color='deep-purple' className="w-full">
                    Sign In
                </Button>
            </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
                to='/signup'
                className="font-medium text-purple-600 hover:underline"
            >
                Sign up
            </Link>
        </p>
    </div>
</div></>
  )
}

export default Login
