import React, { useState, useEffect } from "react";
import "../assets/css/outlets.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Outlets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOutlet, setNewOutlet] = useState("");
  const [outlets, setOutlets] = useState([]);

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
  };
  return (
    <div className="table-container">
      <div className="topDiv">
        <div>
          <b>Outlets</b>
        </div>
        <div>
          <button className="action-button" onClick={openModal}>
            Add Outlet
          </button>
        </div>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Outlets</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {outlets.map((item) => (
            <tr key={item.id}>
              <td>{item.outlet}</td>
              <td>
                <Link to={`/view_outlet/${item.id}`}>
                  <button className="action-button">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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

export default Outlets;
