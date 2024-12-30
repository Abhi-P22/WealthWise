import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Recorditem from './Recorditem'
const Records = () => {
  const state=useContext(GlobalState)
  const[expense]=state.ExpenseApi.list
  
  return (
    <div>
    {expense.map(item=>{
      return <Recorditem key={item} item={item}/>
    })}
    </div>
  )
}

export default Records
