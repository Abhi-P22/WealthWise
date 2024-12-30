import axios from "axios";
import { createContext, useState } from "react";
import UserApi from "./api/UserApi";
import ExpenseApi from './api/ExpenseApi'

export const GlobalState=createContext()
export const StateProvider=({children})=>{
    const[token,setToken]=useState(false)
    const rToken=async()=>{
        const res=await axios.get('/user/refreshToken')
        setToken(res.data.accessToken)
    }
    useState(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin) rToken()
    },[])
    const state={
        UserApi:UserApi(token),
        ExpenseApi:ExpenseApi(),
        token:[token,setToken]
    }
    return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
    )
}
