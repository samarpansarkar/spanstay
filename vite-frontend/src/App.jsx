import React from 'react'
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>home Page</h1>}/>
    </Routes>
  )
}

export default App