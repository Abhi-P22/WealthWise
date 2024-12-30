import React from 'react';
import FinForm from './FinForm'
import Records from './Records'
import Graph from './Graph';
const Dashboard = () => {
  return (
    <div className='dashContainer'>
      <div className='graph'>
        <Graph/>
      </div>
      <div className='form'>
        <FinForm/>
      </div>
      <div className='records'>
        <Records/>
      </div>
    </div>
  )
}

export default Dashboard
