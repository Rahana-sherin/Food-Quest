import React, { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import { useNavigate } from "react-router-dom";
function Location() {
  const [outlets, setOutlets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const savedOutlets = JSON.parse(localStorage.getItem("outlets")) || [];
    setOutlets(savedOutlets);
  }, []);
  const handleOutletClick = (outlet_id) => {
    navigate(`/device_details/${outlet_id}`);
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center justify-between py-4">
        <h1 className="text-lg font-semibold">Outlets</h1>
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
  );
}

export default Location;
