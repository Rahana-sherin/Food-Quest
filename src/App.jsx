import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Clients from "./pages/Clients";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import WorkPlan from "./pages/WorkPlan";
import Outlets from "./pages/Outlets";
import ViewOutlet from "./pages/ViewOutlet";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Location from "./pages/Location";
import DeviceDetails from "./pages/DeviceDetails";
import FullDevicetypeChart from "./pages/FullDevicetypeChart";
import OutletChart from "./pages/OutletChart";
import OutletChartDetails from "./pages/OutletChartDetails";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="members" element={<Members />} />
          <Route path="clients" element={<Clients />} />
          <Route path="messages" element={<Messages />} />
          <Route path="projects" element={<Projects />} />
          <Route path="work" element={<WorkPlan />} />
          <Route path="outlets" element={<Outlets />} />
          <Route path="view_outlet/:id" element={<ViewOutlet />} />
          <Route path="products" element={<Products />} />
          <Route path="location" element={<Location />} />
          <Route path="device_details/:id" element={<DeviceDetails />} />
          <Route path="full" element={<FullDevicetypeChart />} />
          <Route path="outlet_chart" element={<OutletChart />} />
          <Route path="outlet_chart_details/:id" element={<OutletChartDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
