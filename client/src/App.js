import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import Pages from './components/mainpage/Pages'
import Headers from './components/headers/Headers';
import { StateProvider } from './GlobalState';
const App = () => {

  return (
    <StateProvider>
    <Router>
    <div>
      <Headers/>
      <Pages/>
    </div>
    </Router>
    </StateProvider>
  )
}

export default App
