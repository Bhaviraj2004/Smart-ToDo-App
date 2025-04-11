// App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import MainScreen from './components/MainScreen'
import SideBar from './subComponents/SideBar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/login" element={<Login />} />
        {/* <Route path="/main" element={<MainScreen />} /> */}
      </Routes>
    </Router>
  )
}

export default App

