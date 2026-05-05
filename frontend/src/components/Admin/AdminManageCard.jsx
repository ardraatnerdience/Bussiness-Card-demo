import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Admin/Sidebar";
import CardPreview from "../CardPreview/Cardpreview";

const AdminManageCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const card = cards.find(c => c.id.toString() === id);

  if (!card) return <h2>Card not found</h2>;

  const handleDelete = () => {
    const updated = cards.filter(c => c.id.toString() !== id);
    localStorage.setItem("cards", JSON.stringify(updated));
    navigate("/admin/cards");
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="main">

        {/* CARD */}
        <CardPreview data={card} />

        {/* ACTIONS */}
        <div className="admin-actions">

          <button onClick={() => navigate(`/edit/${card.id}`)}>
            Edit
          </button>

          <button onClick={handleDelete}>
            Delete
          </button>

          <button onClick={() => window.print()}>
            Download
          </button>

        </div>

      </div>
    </div>
  );
};

export default AdminManageCard;