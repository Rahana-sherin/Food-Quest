import React from "react";
import "../assets/css/client_card.css"; // Assuming you save the CSS in this file

const ClientCard = ({ client, onClick }) => {
  return (
    <div onClick={onClick} className="client-card space-y-4">
      <div>
        <h1 className="text-xl font-semibold">{client}</h1>
      </div>
    </div>
  );
};

export default ClientCard;
