import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeviceDetails() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [details, setDetails] = useState([]);
  const [outletName, setOutletName] = useState("");
  const [deviceTypeCounts, setDeviceTypeCounts] = useState({});

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    const currentOutlet = savedOutlets.find(
      (outlet) => outlet.id === parseInt(id)
    );
    setOutlet(currentOutlet);
    setOutletName(currentOutlet?.outlet || "Unknown");

    if (currentOutlet) {
      const outletDetails = currentOutlet.details || [];
      setDetails(outletDetails);

      // Create an object to store device categories and their count
      const deviceTypeCountObj = {};
      outletDetails.forEach((detail) => {
        // Extract base category by removing the number suffix (e.g., TV-1 -> TV)
        const baseType = detail.deviceType.split("-")[0];

        if (baseType) { // Ensure baseType is not empty
          if (!deviceTypeCountObj[baseType]) {
            deviceTypeCountObj[baseType] = 1;
          } else {
            deviceTypeCountObj[baseType] += 1;
          }
        }
      });

      setDeviceTypeCounts(deviceTypeCountObj);
    }
  }, [id]);

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">
          {outletName} outlet's device details
        </h1>
      </div>
      <div className="table-scroll-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Device Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(deviceTypeCounts)
              .filter(([deviceType]) => deviceType) // Filter out empty device types
              .map(([deviceType, count], index) => (
                <tr key={index}>
                  <td>{deviceType}</td> {/* Displaying the base deviceType */}
                  <td>{count}</td> {/* Displaying the count */}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceDetails;
