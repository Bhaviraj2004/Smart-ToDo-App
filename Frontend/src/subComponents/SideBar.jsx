import React, { useState } from "react";
import { Rows3, ChevronUp, ChevronDown } from "lucide-react";

const SideBar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const menuItems = [
    { id: 1, name: "All ToDo's" },
    { 
      id: 2, 
      name: "Category", 
      subItems: ["Office", "Home"],
      icon: isCategoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
    },
  ];

  return (
    <div className="bg-white w-64 h-[calc(100vh-5.6rem)] overflow-y-auto shadow-sm rounded-md border-r border-gray-200 p-4">
      <div className="flex items-center mb-6 ml-2">
        <Rows3 className="text-gray-600" />
        <span className="ml-2 text-sm font-medium text-gray-600">Menu</span>
      </div>

      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <div
              className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer text-gray-600 text-sm"
              onClick={item.subItems ? toggleCategory : undefined}
            >
              <span>{item.name}</span>
              {item.icon && <span className="ml-auto">{item.icon}</span>}
            </div>

            {item.subItems && isCategoryOpen && (
              <ul className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem, index) => (
                  <li
                    key={index}
                    className="py-1 px-3 rounded-md hover:bg-gray-50 cursor-pointer text-gray-500 text-sm"
                  >
                    {subItem}
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