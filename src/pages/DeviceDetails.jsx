import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/device_details.css";

function DeviceDetails() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [details, setDetails] = useState([]);
  const [outletName, setOutletName] = useState("");
  const [deviceTypeCounts, setDeviceTypeCounts] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [targetOutletId, setTargetOutletId] = useState("");
  const [outlets, setOutlets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    setOutlets(savedOutlets);
    const currentOutlet = savedOutlets.find(
      (outlet) => outlet.id === parseInt(id)
    );
    setOutlet(currentOutlet);
    setOutletName(currentOutlet?.outlet || "Unknown");

    if (currentOutlet) {
      const outletDetails = currentOutlet.details || [];
      setDetails(outletDetails);
      updateDeviceTypeCounts(outletDetails);
    }
  }, [id]);

  const updateDeviceTypeCounts = (outletDetails) => {
    const deviceTypeCountObj = {};
    outletDetails.forEach((detail) => {
      const baseType = detail.deviceType.split("-")[0];
      if (baseType) {
        if (!deviceTypeCountObj[baseType]) {
          deviceTypeCountObj[baseType] = {
            count: 0,
            transferredCount: 0,
            previousOutlets: {},
          };
        }
        deviceTypeCountObj[baseType].count += 1;

        // Track where devices came from
        if (detail.previousOutlet) {
          deviceTypeCountObj[baseType].transferredCount += 1;
          if (
            !deviceTypeCountObj[baseType].previousOutlets[detail.previousOutlet]
          ) {
            deviceTypeCountObj[baseType].previousOutlets[
              detail.previousOutlet
            ] = 0;
          }
          deviceTypeCountObj[baseType].previousOutlets[
            detail.previousOutlet
          ] += 1;
        }
      }
    });

    // Log all previous outlets for each device type
    console.log("Previous Outlets:", deviceTypeCountObj);

    setDeviceTypeCounts(deviceTypeCountObj);
  };

  const handleTransfer = () => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    const currentOutletIndex = savedOutlets.findIndex(
      (outlet) => outlet.id === parseInt(id)
    );
    const targetOutletIndex = savedOutlets.findIndex(
      (outlet) => outlet.id === parseInt(targetOutletId)
    );

    if (
      currentOutletIndex !== -1 &&
      targetOutletIndex !== -1 &&
      selectedDevice
    ) {
      const deviceToTransfer = outlet.details.find(
        (device) => device.serialNumber === selectedDevice
      );

      if (deviceToTransfer) {
        // Remove device from current outlet
        savedOutlets[currentOutletIndex].details = savedOutlets[
          currentOutletIndex
        ].details.filter((device) => device.serialNumber !== selectedDevice);

        // Prepare new device data for transfer
        const newDeviceData = {
          ...deviceToTransfer,
          previousOutlet: outletName, // Set the previous outlet name
        };

        // Add the device to the target outlet
        savedOutlets[targetOutletIndex].details.push(newDeviceData);

        // Update transferred counts
        const baseType = deviceToTransfer.deviceType.split("-")[0];
        const updatedCounts = { ...deviceTypeCounts };

        // Increment counts
        if (updatedCounts[baseType]) {
          updatedCounts[baseType].transferredCount += 1; // Increment transferred count
          if (!updatedCounts[baseType].previousOutlets[outletName]) {
            updatedCounts[baseType].previousOutlets[outletName] = 0;
          }
          updatedCounts[baseType].previousOutlets[outletName] += 1; // Increment count for source outlet
        }

        // Update local storage and state
        localStorage.setItem("outlets", JSON.stringify(savedOutlets));
        setDetails(savedOutlets[currentOutletIndex].details);
        setDeviceTypeCounts(updatedCounts); // Update counts after transfer

        // Reset state
        setTargetOutletId("");
        setSelectedDevice(null);
        setIsModalOpen(false); // Close modal
        alert("Device transferred successfully!");
      } else {
        alert("Device not found!");
      }
    } else {
      setIsModalOpen(false);
      alert("Invalid transfer operation.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">
          {outletName} outlet's device details
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="action-button ">
          Transfer Device
        </button>
      </div>
      <div className="table-scroll-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Device Type</th>
              <th>Total Count</th>
              <th>Transferred Count</th>
              <th>Transferred Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(deviceTypeCounts)
              .filter(([deviceType]) => deviceType)
              .map(
                (
                  [deviceType, { count, transferredCount, previousOutlets }],
                  index
                ) => (
                  <tr key={index}>
                    <td>{deviceType}</td>
                    <td>{count}</td>
                    <td>{transferredCount}</td>
                    <td>
                      {Object.entries(previousOutlets).map(([outlet, num]) => (
                        <div key={outlet}>
                          {outlet}: {num}
                        </div>
                      ))}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>

      {/* Transfer Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <b>Transfer Device</b>
            <select onChange={(e) => setSelectedDevice(e.target.value)}>
              <option value="">Select Device</option>
              {details.map((device) => (
                <option key={device.serialNumber} value={device.serialNumber}>
                  {device.deviceType} - {device.serialNumber}
                </option>
              ))}
            </select>
            <select onChange={(e) => setTargetOutletId(e.target.value)}>
              <option value="">Select Target Outlet</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.outlet}
                </option>
              ))}
            </select>
            <br />
            <button
              className="transfer-button"
              onClick={handleTransfer}
              disabled={!selectedDevice || !targetOutletId}
            >
              Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceDetails;
