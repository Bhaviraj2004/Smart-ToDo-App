import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import "./Darkmode.css"; // Make sure it has .dark class
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Toggle function
  const handleTogglebtn = () => {
    setDarkMode((prev) => !prev);
  };

  // ✅ Apply dark class to <body> on toggle
  useEffect(() => {
    const body = document.querySelector('.darkbody');
    if (!body) return; // safety check
  
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <>
      <div className="darkbody">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 w-full">
          <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Title */}
            <h1 className="text-white text-3xl font-bold cursor-pointer">
              To<span className="text-yellow-300">Do</span>
            </h1>

            {/* Search Bar */}
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full px-4 py-2 rounded-lg border-none focus:outline-none  text-gray-700"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    alert("Search bar is not functional yet");
                  }
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleTogglebtn}
                className={`${darkMode ? 'bg-black text-white' : 'bg-white text-blue-900'} font-medium px-4 py-1.5 rounded transition duration-300`}

              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-blue-600 font-medium px-4 py-1.5 rounded hover:bg-gray-100 transition duration-300"
              >
                Profile
              </button>
            </div>
          </div>
          {showModal && (
            <Profile
              onClose={() => {
                setShowModal(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
