import React, { useState, useEffect } from "react";
import ClientCard from "../components/ClientCard";
import { Link } from "react-router-dom";
import "../assets/css/outlets.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
      style: { backgroundColor: "green", color: "white", padding:"15px" },
    });

  };
  const handleOutletClick = (id) => {
    navigate(`/view_outlet/${id}`);
  };
  return (
    <div className="p-5">
      <Toaster/>
      <div>
        <div className="flex justify-between items-center justify-between py-4">
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
            />
          ))}{" "}
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
