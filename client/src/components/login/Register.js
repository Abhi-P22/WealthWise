import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Register = () => {
    const[user,setUser]=useState({
        name:'',
        email:'',
        password:''
    })

    const inputChange=(e)=>{
        const{name,value}=e.target
        setUser({...user,[name]:value})
    }

    const registerSubmit=(e)=>{
        e.preventDefault()
        try{
            axios.post('/user/register',{...user})
            localStorage.setItem('firstregister',true)
            window.location.href='/home'
        }catch(e){
            alert(e.response.data.msg)
        }
    }
  return (
    <div className='registerPage'> 
      <form onSubmit={registerSubmit}>
        <input type='text' name='name' required placeholder='Enter Username' value={user.name} onChange={inputChange}/>
        <input type='email' name='email' required placeholder='Enter Email' value={user.email} onChange={inputChange}/>
        <input type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={inputChange}/>
        <div>
            <button type='submit'>Register</button>
            <Link to={'/'}>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
