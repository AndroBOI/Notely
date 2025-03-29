import React from 'react'
import Login from './Components/Login'
import Signup from './Components/SingUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login/>}/>
        <Route path="/signup" element={ <Signup/>}/>
      </Routes>
       
    </Router>
   
  )
}
