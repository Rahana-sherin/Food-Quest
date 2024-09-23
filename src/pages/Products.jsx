import React, { useEffect, useState } from "react";
import { Container, Box } from '@mui/material';
import LineChart from '../components/LineChart';

const App = () => {
  const [deviceTypeCounts, setDeviceTypeCounts] = useState({});

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    
    const deviceTypeCountObj = {};

    savedOutlets.forEach((outlet) => {
      if (outlet.details && Array.isArray(outlet.details)) {
        outlet.details.forEach((detail) => {
          const baseType = detail.deviceType.split("-")[0];

          // Check if baseType is not empty before counting
          if (baseType) {
            if (!deviceTypeCountObj[baseType]) {
              deviceTypeCountObj[baseType] = 1;
            } else {
              deviceTypeCountObj[baseType] += 1;
            }
          }
        });
      }
    });

    setDeviceTypeCounts(deviceTypeCountObj);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">All Device Types and Their Count</h1>
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
                  <td>{deviceType}</td>
                  <td>{count}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
