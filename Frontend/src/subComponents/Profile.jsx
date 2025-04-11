import React,{useRef} from 'react';
import { X, ShieldUser } from 'lucide-react';

function Profile({onClose}) {

    const profileRef = useRef();

    const closeModal = (e) => {
        if (profileRef.current === e.target) {
            onClose();
        }
    }


  return (
    <div ref={profileRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-indigo-600  text-white rounded-2xl shadow-lg w-[30%] h-[40%] p-6 flex flex-col items-center gap-6 pt-10">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition">
          <X size={24} />
        </button>

        {/* User Icon */}
        <div className="bg-blue-100 p-4 rounded-full">
          <ShieldUser size={50} className="text-blue-600" />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold">Bhaviraj</h1>

        {/* Action Buttons */}
        <div className="flex gap-[50px] mt-2">
          <button className=" w-[150px] px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
            Edit
          </button>
          <button className="w-[150px] px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-red-500 transition">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
