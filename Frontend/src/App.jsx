// App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import MainScreen from './components/MainScreen'
// import SideBar from './subComponents/SideBar'
import { useNavigate } from "react-router-dom";


function App() {
  

console.log(localStorage.getItem('token'))
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainScreen />} />
      </Routes>
    </Router>
  )
}
export default App