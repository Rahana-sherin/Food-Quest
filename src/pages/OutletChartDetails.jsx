import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Container } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OutletChartDetails() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [outletName, setOutletName] = useState("");
  const [deviceTypeCounts, setDeviceTypeCounts] = useState({});

  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    const currentOutlet = savedOutlets.find((outlet) => outlet.id === parseInt(id));
    setOutlet(currentOutlet);
    setOutletName(currentOutlet?.outlet || "Unknown");

    if (currentOutlet) {
      const outletDetails = currentOutlet.details || [];
      // Create an object to store device categories and their count
      const deviceTypeCountObj = {};
      
      outletDetails.forEach((detail) => {
        const baseType = detail.deviceType.split("-")[0];

        if (baseType) { // Ensure baseType is not empty
          deviceTypeCountObj[baseType] = (deviceTypeCountObj[baseType] || 0) + 1;
        }
      });

      setDeviceTypeCounts(deviceTypeCountObj);
    }
  }, [id]);

  // Prepare data for the bar chart
  const filteredDeviceCounts = Object.entries(deviceTypeCounts)
    .filter(([deviceType]) => deviceType) // Filter out empty device types
    .reduce((acc, [deviceType, count]) => {
      acc.labels.push(deviceType);
      acc.data.push(count);
      return acc;
    }, { labels: [], data: [] });

  const data = {
    labels: filteredDeviceCounts.labels, // X-axis labels (Device types)
    datasets: [
      {
        label: "Device Count", // Label for the dataset
        data: filteredDeviceCounts.data, // Y-axis data (Device counts)
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color for the bars
        borderColor: 'rgba(75, 192, 192, 1)', // Border color for the bars
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${outletName} Outlet Device Type Distribution`,
      },
    },
  };

  return (
    <Container>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-lg font-semibold">
          {outletName} Outlet's Device Details
        </h1>
      </div>

      {/* Display table and chart side by side */}
      <Grid item>
        <Box>
          <Bar data={data} options={options} />
        </Box>
      </Grid>
    </Container>
  );
}

export default OutletChartDetails;
