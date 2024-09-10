import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import "../assets/css/outlets.css";
import toast, { Toaster } from "react-hot-toast";
const ViewOutlet = () => {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [newDetail, setNewDetail] = useState({
    department: "",
    name: "",
    deviceType: "",
    brand: "",
    model: "",
    serialNumber: "",
    ipAddress: "",
    anydesk: "",
  });

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    const currentOutlet = savedOutlets.find(
      (outlet) => outlet.id === parseInt(id)
    );
    setOutlet(currentOutlet);
    if (currentOutlet) {
      setDetails(currentOutlet.details || []);
    }
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDetail({
      department: "",
      name: "",
      deviceType: "",
      brand: "",
      model: "",
      serialNumber: "",
      ipAddress: "",
      anydesk: "",
    });
  };

  const handleAddDetail = () => {
    if (Object.values(newDetail).some((value) => value.trim() === "")) return;

    const updatedDetails = [...details, newDetail];
    setDetails(updatedDetails);
    setOutlet((prev) => ({
      ...prev,
      details: updatedDetails,
    }));
    localStorage.setItem(
      "outlets",
      JSON.stringify(
        JSON.parse(localStorage.getItem("outlets")).map((outlet) =>
          outlet.id === parseInt(id)
            ? { ...outlet, details: updatedDetails }
            : outlet
        )
      )
    );

    closeModal();
    toast.success("Details added successfully", {
      duration: 3000,
      position: "top-right",
      style: { backgroundColor: "green", color: "white", padding: "15px" },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const updatedDetails = jsonData.map((row) => ({
        department: row["Department"] || "",
        name: row["Name"] || "",
        deviceType: row["Device Type"] || "",
        brand: row["Brand"] || "",
        model: row["Model"] || "",
        serialNumber: row["Serial Number"] || "",
        ipAddress: row["IP-Address "] || "",
        anydesk: row["Anydesk"] || "",
      }));

      setDetails(updatedDetails);
      setOutlet((prev) => ({
        ...prev,
        details: updatedDetails,
      }));

      // Update localStorage
      const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
      localStorage.setItem(
        "outlets",
        JSON.stringify(
          savedOutlets.map((outlet) =>
            outlet.id === parseInt(id)
              ? { ...outlet, details: updatedDetails }
              : outlet
          )
        )
      );
    };
    reader.readAsArrayBuffer(file);
    toast.success("Excel content imported Successfully", {
      duration: 3000,
      position: "top-right",
      style: { backgroundColor: "green", color: "white", padding: "15px" },
    });
  };

  if (!outlet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <Toaster />
      <div className="topDiv">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 style={{ fontWeight: "bolder", marginBottom: "10px" }}>
              {outlet.outlet} Outlet Details
            </h1>
          </div>
          <div>
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="action-button">
              Import from Excel
            </label>
            <button className="action-button" onClick={openModal}>
              Add Details
            </button>
            <Link to={`/`}>
              <button className="action-button">Back</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="table-scroll-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Name</th>
              <th>Device Type</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>IP-Address</th>
              <th>Anydesk</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index}>
                <td>{detail.department}</td>
                <td>{detail.name}</td>
                <td>{detail.deviceType}</td>
                <td>{detail.brand}</td>
                <td>{detail.model}</td>
                <td>{detail.serialNumber}</td>
                <td>{detail.ipAddress}</td>
                <td>{detail.anydesk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Add New Details</h2>
            <form>
              <input
                type="text"
                name="department"
                value={newDetail.department}
                onChange={handleInputChange}
                placeholder="Department"
              />
              <input
                type="text"
                name="name"
                value={newDetail.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="deviceType"
                value={newDetail.deviceType}
                onChange={handleInputChange}
                placeholder="Device Type"
              />
              <input
                type="text"
                name="brand"
                value={newDetail.brand}
                onChange={handleInputChange}
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                value={newDetail.model}
                onChange={handleInputChange}
                placeholder="Model"
              />
              <input
                type="text"
                name="serialNumber"
                value={newDetail.serialNumber}
                onChange={handleInputChange}
                placeholder="Serial Number"
              />
              <input
                type="text"
                name="ipAddress"
                value={newDetail.ipAddress}
                onChange={handleInputChange}
                placeholder="IP Address"
              />
              <input
                type="text"
                name="anydesk"
                value={newDetail.anydesk}
                onChange={handleInputChange}
                placeholder="Anydesk"
              />
              <button
                type="button"
                className="action-button"
                onClick={handleAddDetail}
              >
                Add Detail
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOutlet;
