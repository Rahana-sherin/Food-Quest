import React from "react";
import "../assets/css/client_card.css";

const ClientCard = ({ client, onClick, onDelete, hasDelete }) => {
  return (
    <div className="client-card space-y-4">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-xl font-semibold">{client}</h1>
        <div>
          {hasDelete && (
            <button
              className="action-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </button>
          )}

          <button onClick={onClick} className="action-button">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
