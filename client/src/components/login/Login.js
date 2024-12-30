import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  const[user,setUser]=useState({
    email:'',
    password:''
  })

  const inputChange=(e)=>{
    const{name,value}=e.target
    setUser({...user,[name]:value})
  }
  const loginSubmit=async(e)=>{
    e.preventDefault()
    try{
      await axios.post('/user/login',{...user})
      localStorage.setItem("firstlogin",true)
      window.location.href='/home'
    }catch(e){
      alert(e.response.data.msg)
    }
  }
  return (
    <div className='loginPage'>
      <form onSubmit={loginSubmit}>
        <input type='email' name='email' required placeholder='Enter Email' value={user.email} onChange={inputChange}/>
        <input type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={inputChange} />
      <div>
        <button type='submit'>Login</button>
        <Link to='/register'>Register</Link>
      </div>
      </form>
    </div>
  )
}

export default Login
