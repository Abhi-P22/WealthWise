import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const ExpenseApi = () => {
    const [expense,setExpense]=useState([])
    const getExp=async()=>{
      try {
        const res = await axios.get('/api/list');
        setExpense(res.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    }
    useEffect(()=>{
        getExp()
    },[])
  return{
    list:[expense,setExpense],
    refreshList:getExp
  }
}

export default ExpenseApi
