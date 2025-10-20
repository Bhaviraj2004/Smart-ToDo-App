import React, { useState } from "react";
import { ChevronUp, ChevronDown, AlignJustify, Home, Briefcase } from "lucide-react";

const SideBar = () => {
  const [openCategories, setOpenCategories] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { 
      id: 1, 
      name: "All ToDo's",
      icon: <Home size={16} className="mr-2" />
    },
    { 
      id: 2, 
      name: "Category",
      icon: <Briefcase size={16} className="mr-2" />,
      subItems: [
        { name: "Office"},
        { name: "Home"}
      ]
    },
  ];

  return (
    <div className={`bg-white h-[calc(100vh-4rem)] overflow-y-auto shadow-sm rounded-r-lg border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-[200px] p-3' : 'w-[50px] p-2 shadow-none rounded-none border-none' }`}>
      <div className="flex justify-end items-center mb-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <AlignJustify size={20} />
        </button>
      </div>

      <ul className="space-y-1">
  {menuItems.map((item) => (
    <li key={item.id} className={!isSidebarOpen ? 'hidden' : ''}>
      <div
        className={`flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600 text-sm ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}
        onClick={item.subItems ? () => toggleCategory(item.id) : undefined}
      >
        <div className="flex items-center">
          {item.icon}
          {isSidebarOpen && <span>{item.name}</span>}
        </div>
        
        {item.subItems && isSidebarOpen && (
          <span>
            {openCategories[item.id] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </span>
        )}
      </div>

      {item.subItems && openCategories[item.id] && isSidebarOpen && (
        <ul className="ml-4 mt-1 space-y-1">
          {item.subItems.map((subItem, index) => (
            <li
              key={index}
              className="flex items-center py-1 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-gray-500 text-sm"
            >
              {subItem.icon}
              {subItem.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>
    </div>
  );
};

export default SideBar;