import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  ChevronUp,
  ChevronDown,
  AlignJustify,
  Home,
  Briefcase,
  PlusCircle,
  X,
  Calendar,
} from "lucide-react";

const SideBar = () => {
  const [openCategories, setOpenCategories] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Category list (from backend)
  const [categories, setCategories] = useState([]);

  const dateInputRef = useRef(null);

  // Get token with validation
  const getToken = () => {
    // const token = localStorage.getItem("jwt");
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No JWT token found in localStorage");
      alert("Please login first!");
      return null;
    }
    return token;
  };

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle category expand/collapse
  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Fetch categories from backend with proper error handling
  const fetchCategories = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:1337/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setCategories(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        // Optional: Redirect to login page
        // window.location.href = '/login';
      } else {
        alert("Failed to fetch categories!");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Create new category in backend
  // ✅ Create new category in backend
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name!");
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const requestData = {
        data: {
          name: newCategory.trim()
        }
      };

      console.log("📤 Creating category:", requestData);

      await axios.post(
        "http://localhost:1337/api/categories",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setNewCategory("");
      alert("✅ Category created!");
      fetchCategories(); // refresh category list
    } catch (err) {
      console.error("❌ Error creating category:", err);
      console.log("Category error details:", err.response?.data);

      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
      } else if (err.response?.status === 400) {
        alert(`Invalid category data: ${err.response?.data?.error?.message}`);
      } else {
        alert("Failed to create category!");
      }
    }
  };

  // ✅ Add Todo in backend
  // ✅ Add Todo in backend
  // ✅ Add Todo in backend
  const handleAddTask = async () => {
    // Validate required fields
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      // Prepare data object with CORRECT priority values
      const requestData = {
        data: {
          title: title.trim(),
          description: description.trim(),
          priority: priority ? priority.toLowerCase() : "medium", // ✅ Convert to lowercase
        }
      };

      // Only add date if provided and valid
      if (date) {
        requestData.data.date = date;
      }

      // Only add category if selected
      if (category && category !== "") {
        requestData.data.category = parseInt(category);
      }

      console.log("📤 Sending data to server:", JSON.stringify(requestData, null, 2));

      const res = await axios.post(
        "http://localhost:1337/api/todos",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("✅ Todo added successfully:", res.data);
      alert("Todo added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setPriority("");
      setCategory("");
      setShowPopup(false);

      // Refresh categories if needed
      fetchCategories();
    } catch (err) {
      console.error("❌ Error adding Todo:", err);
      console.log("📋 Error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.response?.data?.error?.message
      });

      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
      } else if (err.response?.status === 400) {
        alert(`Invalid data: ${err.response?.data?.error?.message || "Please check your inputs"}`);
      } else {
        alert("Failed to add Todo!");
      }
    }
  };
  // Menu items
  const menuItems = [
    {
      id: "create",
      name: "Create",
      icon: <PlusCircle size={16} className="mr-2" />,
      onClick: () => setShowPopup(true),
    },
    {
      id: 1,
      name: "All ToDo's",
      icon: <Home size={16} className="mr-2" />,
    },
    {
      id: 2,
      name: "Category",
      icon: <Briefcase size={16} className="mr-2" />,
      subItems: categories.map((cat) => ({
        id: cat.id,
        name: cat.attributes.name,
      })),
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white h-[calc(100vh-4rem)] overflow-y-auto shadow-sm rounded-r-lg border-r border-gray-200 transition-all duration-300 ${isSidebarOpen
            ? "w-[200px] p-3"
            : "w-[50px] p-2 shadow-none rounded-none border-none"
          }`}
      >
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <AlignJustify size={20} />
          </button>
        </div>

        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id} className={!isSidebarOpen ? "hidden" : ""}>
              <div
                className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600 text-sm justify-between"
                onClick={
                  item.onClick
                    ? item.onClick
                    : item.subItems
                      ? () => toggleCategory(item.id)
                      : undefined
                }
              >
                <div className="flex items-center">
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </div>

                {item.subItems && isSidebarOpen && (
                  <span>
                    {openCategories[item.id] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )}
                  </span>
                )}
              </div>

              {/* Category sub-menu */}
              {item.subItems && openCategories[item.id] && isSidebarOpen && (
                <ul className="ml-4 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="flex items-center py-1 px-3 rounded-md hover:bg-gray-100 cursor-pointer text-gray-500 text-sm"
                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-gray-100 w-[95%] max-w-3xl rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 text-gray-700">
              Add New ToDo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Section */}
              <div className="flex flex-col space-y-3">
                <input
                  type="text"
                  placeholder="Title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  required
                />
                <textarea
                  placeholder="Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 text-sm h-[170px] resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Right Section */}
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <Calendar
                    size={16}
                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                    onClick={() => dateInputRef.current?.showPicker()}
                  />
                </div>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">Priority level</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                {/* Category Dropdown with Add Option */}
                <div className="border border-gray-300 rounded-md p-2 text-sm bg-white">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full outline-none text-gray-600 mb-2"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.attributes.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Create new category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCreateCategory()
                    }
                    className="w-full border-t border-gray-300 pt-2 outline-none"
                  />
                </div>

                <button
                  onClick={handleAddTask}
                  className="bg-blue-600 text-white rounded-md py-2 text-sm hover:bg-blue-700 transition"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;