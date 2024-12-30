import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const FinForm = () => {
  const state=useContext(GlobalState)
  const{refreshList}=state.ExpenseApi
  const[entry,setEntry]=useState({
    title:'',
    amount:'',
    category:'',
    paytype:''
  })
  const inputChange=(e)=>{
    const{name,value}=e.target
    setEntry({...entry,[name]:value})
  }
  const submitForm=async(e)=>{
    e.preventDefault()
    console.log(entry);
    try{
      await axios.post('/api/list',entry)
      refreshList()
      setEntry({ title: "", amount: "", category: "", paytype: "" })
    }catch(e){
      alert(e)
    }
  }
  useEffect(()=>{

  })
  return (
    <div className='formContainer'>
      <form onSubmit={submitForm}>
        <label>Decription:</label>
        <input type='text' name='title' required value={entry.title} onChange={inputChange}/>
        <label>Amount:</label>
        <input type='number' name='amount' required value={entry.amount} onChange={inputChange}/>
        <label>Category:</label>
        <select name='category' id='category' value={entry.category} onChange={inputChange}>
            <option>Select A Category</option>
            <option value={"Entertainment"}>Entertainment</option>
            <option value={"Investment"}>Investment</option>
            <option value={"Home-Expense"}>Home Expense</option>
            <option value={"Shopping"}>Shopping</option>
        </select>
        <label>Payment Type:</label>
        <select name='paytype' id='paytype' value={entry.paytype} onChange={inputChange}>
            <option>Select A Method</option>
            <option value={"Upi"}>Upi</option>
            <option value={"Cash"}>Cash</option>
            <option value={"Credit-Card"}>Credit Card</option>
            <option value={"Debit-Card"}>Debit Card</option>
        </select>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default FinForm
