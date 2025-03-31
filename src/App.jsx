import React, { useState } from 'react'
import GetStarted from './Components/GetStarted'
import Signup from './Components/SingUp';
import Login from './Components/Login'
import Home from './Components/Home';
import CreateNote from './Components/CreateNote';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  const [notes, setNotes] = useState([])

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <GetStarted/>}/>
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/home" element={<Home notes={notes}/>}/>
        <Route path="/create-note" element={<CreateNote setNotes={setNotes}/>}/>
      </Routes>
       
    </Router>
   
  )
}
