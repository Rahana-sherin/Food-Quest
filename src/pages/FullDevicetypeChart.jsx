import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FullDevicetypeChart() {
  const [deviceTypeCounts, setDeviceTypeCounts] = useState({});

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    const deviceTypeCountObj = {};

    savedOutlets.forEach((outlet) => {
      if (outlet.details && Array.isArray(outlet.details)) {
        outlet.details.forEach((detail) => {
          const baseType = detail.deviceType.split("-")[0];

          if (baseType) { // Check for non-empty baseType
            deviceTypeCountObj[baseType] = (deviceTypeCountObj[baseType] || 0) + 1;
          }
        });
      }
    });

    setDeviceTypeCounts(deviceTypeCountObj);
  }, []);

  // Prepare data for the bar chart
  const filteredDeviceTypes = Object.entries(deviceTypeCounts)
    .filter(([deviceType]) => deviceType) // Filter out empty device types
    .reduce((acc, [deviceType, count]) => {
      acc.labels.push(deviceType);
      acc.data.push(count);
      return acc;
    }, { labels: [], data: [] });

  const data = {
    labels: filteredDeviceTypes.labels, // X-axis labels (Device types)
    datasets: [
      {
        label: "Device Count", // Label for the dataset
        data: filteredDeviceTypes.data, // Y-axis data (Device counts)
        backgroundColor: "rgba(53, 162, 235, 0.5)", // Color for the bars
        borderColor: "rgba(53, 162, 235, 1)", // Border color for the bars
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to grow with the container
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Device Types and Their Counts",
      },
    },
  };

  return (
    <Container>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">
          All Device Types and Their Count
        </h1>
      </div>
      <Box mt={4} style={{ height: "400px" }}> {/* Set a specific height for better responsiveness */}
        {/* Render the bar chart */}
        <Bar data={data} options={options} />
      </Box>
    </Container>
  );
}

export default FullDevicetypeChart;
