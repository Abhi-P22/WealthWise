import axios from 'axios'
import React,{ useEffect,useState } from 'react'

const UserApi = (token) => {
    const[isLogged,setIsLogged]=useState(false)
    const[isAdmin,setIsAdmin]=useState(false)
    const[info,setInfo]=useState([])
    useEffect(()=>{
        if(token){
            const getInfo=async()=>{
                const res=await axios.get('/user/info',{headers:{Authorization:token}})
                setInfo(res.data)
                setIsLogged(true)
                res.data.role===1?setIsAdmin(true):setIsAdmin(false)
            }
            getInfo()
        }
    },[token])
  return{
    isLogged:[isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin],
    info:[info,setInfo]
  }
}

export default UserApi
