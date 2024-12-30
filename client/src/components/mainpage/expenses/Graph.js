import React, { useContext } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GlobalState } from '../../../GlobalState';
const Graph = () => {
    const state=useContext(GlobalState)
    const[expense]=state.ExpenseApi.list
    console.log(expense);
    if (expense.length === 0) {
      return <div>Loading data...</div>;
    }
    const data=expense.reduce((acc,curr)=>{
        const existingCat=acc.find(item=>item.category===curr.category)
        console.log(existingCat);
        if(existingCat){
            existingCat.amount+=curr.amount
        }
        else{
            acc.push({category:curr.category,amount:curr.amount})
        }
        return acc
    },[])
    console.log(data);
  return (
    <div>
      <h2>Spending Summary:</h2>
      <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" label={{ value: "Categories", position: "insideBottom", offset: -5 }} />
        <YAxis label={{ value: "Total Amount", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
