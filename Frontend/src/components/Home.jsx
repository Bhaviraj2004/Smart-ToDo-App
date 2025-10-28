import React from "react";
import welcomeleft from "./image/welcome-left.png";
import welcomeright from "./image/welcome-right.png";
import { useNavigate } from 'react-router-dom'
import '../App.css'


const Home = () => {
  const navigate = useNavigate()
  const goToLogin = () => {
    document.body.classList.add('fade-out')
  setTimeout(() => {
    navigate('/login')
  }, 300)
  }
  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    <div className="max-h-screen bg-white">
      <header className="flex items-center justify-between sm:pt-3 px-6 py-5 md:px-12 lg:px-24">
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
          <span className="text-blue-600">To</span>Do
        </h1>
        <button onClick={goToLogin} className="mt-4 text-gray-700 border-2 border-blue-500 bg-transparent px-4 py-1 rounded-xl text-base hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 md:px-6 md:text-lg">
          Sign In
        </button>
      </header>

      <main className="flex flex-col-reverse gap-8 mt-10 px-6 py-5 md:flex-row md:justify-between md:items-center md:gap-6 md:px-12 lg:px-24 lg:mt-16">
        {/* Left Image - Hidden on small screens */}
        <div className="hidden md:block md:flex-1 mr-[100px]">
          <img 
            src={welcomeleft} 
            alt="Welcome" 
            className="w-full max-w-[350px] object-contain" 
          />
        </div>
        
        {/* Center Content */}
        <div className="flex flex-col gap-6 items-center text-center max-w-md md:max-w-xl">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            Organize Your <span className="text-blue-600"> Tasks</span> Effortlessly
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Boost your productivity with our intuitive todo app. Manage your daily tasks, set priorities, and achieve your goals faster than ever before. Perfect for individuals and teams alike.
          </p>
          <button onClick={goToLogin} className="bg-blue-600 text-white px-12 py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg w-full max-w-xs">
            Get Started
          </button>
        </div>
        
        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end ml-[100px]">
          <img 
            src={welcomeright} 
            alt="ToDo Illustration" 
            className="w-full max-w-[240px] max-h-[500px] object-contain" 
          />
        </div>
      </main>
    </div>
  );
};

export default Home;