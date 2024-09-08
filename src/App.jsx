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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
