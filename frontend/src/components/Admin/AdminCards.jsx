import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "../Sidebar/Admin/Sidebar";
import "./AdminCards.css";

const AdminCards = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // ✅ SAFE IMAGE HANDLER (base64 only)
  const getImageSrc = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    return null;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(stored);
  }, []);

  return (
    <div>
      <Navbar />
      <AdminSidebar />

      <div className="admin-cards-container">
        <h1>All Cards</h1>

        <div className="admin-cards-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="admin-card"
              onClick={() => navigate(`/admin/manage/${card.id}`)}
            >

              {/* BACKGROUND */}
              <div
                className="card-top"
                style={{
                  backgroundImage: card.backgroundImage
                    ? `url(${getImageSrc(card.backgroundImage)})`
                    : undefined
                }}
              ></div>

              {/* CONTENT */}
              <div className="card-content">

                {/* PROFILE */}
                <div className="card-avatar">
                  {getImageSrc(card.photo) && (
                    <img src={getImageSrc(card.photo)} alt="profile" />
                  )}
                </div>

                {/* TEXT */}
                <h3>{card.name || "John Doe"}</h3>
                <p>{card.title || "Job Title"}</p>
                <p className="org">{card.org || "Organization"}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCards;