import React, { useRef, useEffect, useState } from "react";
import { X, ShieldUser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile({ onClose }) {
  const profileRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const closeModal = (e) => {
    if (profileRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, []);

  const displayName =
    username.length > 10 ? username.slice(0, 10) + "..." : username;

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    navigate("/");
  };

  return (
    <div
      ref={profileRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-2xl w-[420px] h-[300px] p-8 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-center gap-10 h-full">
          <div className="flex justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full shadow-md">
              <ShieldUser size={80} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 text-center">
            <h1
              className="text-3xl font-bold tracking-wide drop-shadow-md"
              title={username}
            >
              {displayName || "Guest"}
            </h1>

            <button
              onClick={handleLogout}
              className="w-[140px] self-center px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
