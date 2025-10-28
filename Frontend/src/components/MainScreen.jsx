import React from 'react'
import Header from '../subComponents/Header'
import SideBar from '../subComponents/SideBar'
import MidScreen from '../subComponents/MidScreen'

const MainScreen = () => {
  return (
    <>
      {/* Header top par */}
      <Header />

      {/* Sidebar left aur MidScreen right */}
      <div className="flex h-screen">
        <SideBar />
        <MidScreen />
      </div>
    </>
  )
}

export default MainScreen
