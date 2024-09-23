import React, { useState, useEffect } from "react";
import ClientCard from "../components/ClientCard";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/outlets.css";
import toast from "react-hot-toast";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOutlet, setNewOutlet] = useState("");
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();

  // Fetch outlets from localStorage when component mounts
  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    setOutlets(savedOutlets);
  }, []);

  // Handle opening and closing of the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewOutlet("");
  };

  // Handle adding a new outlet
  const handleAddOutlet = () => {
    if (newOutlet.trim() === "") return; // Prevent adding empty outlets

    const newOutletData = {
      outlet: newOutlet,
      id: Date.now(), // Using timestamp as unique id
    };

    const updatedOutlets = [...outlets, newOutletData];
    setOutlets(updatedOutlets);
    localStorage.setItem("outlets", JSON.stringify(updatedOutlets));

    closeModal();
    toast.success("New Outlet Created", {
      duration: 3000,
      position: "top-right",
      style: { backgroundColor: "green", color: "white", padding: "15px" },
    });
  };

  // Handle outlet click
  const handleOutletClick = (id) => {
    navigate(`/view_outlet/${id}`);
  };

  // Handle deleting an outlet
  const handleDeleteOutlet = (id) => {
    console.log("Deleting outlet with id:", id); // Debugging line
    const updatedOutlets = outlets.filter(outlet => outlet.id !== id);
    console.log("Updated outlets:", updatedOutlets); // Debugging line
    setOutlets(updatedOutlets);
    localStorage.setItem("outlets", JSON.stringify(updatedOutlets));
    toast.error("Outlet Deleted", {
      duration: 3000,
      position: "top-right",
      style: { backgroundColor: "red", color: "white", padding: "15px" },
    });
  };
  
  return (
    <div className="p-5">
      <div>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg font-semibold">Outlets</h1>
          <button className="action-button" onClick={openModal}>
            Add Outlet
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {outlets.map((item) => (
            <ClientCard
              client={item.outlet}
              onClick={() => handleOutletClick(item.id)}
              onDelete={() => handleDeleteOutlet(item.id)}
              key={item.id} // Use the id as the key for better uniqueness
              hasDelete={true}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Add New Outlet</h2>
            <input
              type="text"
              value={newOutlet}
              onChange={(e) => setNewOutlet(e.target.value)}
              placeholder="Enter outlet name"
            />
            <button className="action-button" onClick={handleAddOutlet}>
              Add Outlet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
