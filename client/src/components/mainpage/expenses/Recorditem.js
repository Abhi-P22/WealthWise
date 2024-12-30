import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const Recorditem = ({key,item}) => {
  const state=useContext(GlobalState)
  const{refreshList}=state.ExpenseApi
  const[isEditng,SetIsEditing]=useState(false)
  const[updatedItem,SetUpdatedItem]=useState({
    "title":item.title,
    "amount":item.amount,
    "category":item.category,
    "paytype":item.paytype
  })
  const deleteItem=async(id)=>{
    try{
      await axios.delete(`/api/list/${id}`)
      refreshList()
    }catch(e){
      alert(e.response.data.msg)
    }
  }
  const editItem=async(id)=>{
    try{
      await axios.put(`/api/list/${id}`,updatedItem)
      refreshList();
      SetIsEditing(false);
    }catch(e){
      alert(e.response.data.msg)
    }
  }
  const changeHandler=(e)=>{
    const{name,value}=e.target
    SetUpdatedItem({...updatedItem,[name]:value})
  }
  return (
    <div className='expRow'>
      <ul>
        <li>Description:
          {isEditng?(<input type='text' name='title' onChange={changeHandler} value={updatedItem.title}/>):(item.title)}
        </li>
        <li>Amount:
          {isEditng?(<input type='text' name='amount' onChange={changeHandler} value={updatedItem.amount}/>):(item.amount)}
        </li>
        <li>Category:
          {isEditng?(<input type='text' name='category' onChange={changeHandler} value={updatedItem.category}/>):(item.category)}
        </li>
        <li>Payment:
          {isEditng?(<input type='text' name='paytype' onChange={changeHandler} value={updatedItem.paytype}/>):(item.paytype)}
        </li>
        <button type='button' onClick={()=>{deleteItem(item._id)}}>Delete</button>
        {
        isEditng
        ?(<button type='button' onClick={()=>{editItem(item._id)}}>Save</button>)
        :(<button type='button' onClick={()=>{SetIsEditing(true)}}>Edit</button>)
        }
      </ul>
    </div>
  )
}

export default Recorditem
