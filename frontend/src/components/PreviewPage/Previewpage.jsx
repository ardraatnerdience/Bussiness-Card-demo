import React, { useEffect, useState } from "react";
import CardPreview from "../Cardpreview/Cardpreview";
import "./Previewpage.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/User/Sidebar";
import { useNavigate } from "react-router-dom";
const Previewpage = ({ onCardClick }) => {
  const [cards, setCards] = useState([]);

const navigate = useNavigate();

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(savedCards);
  }, []);

  const handleDelete = (id) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    localStorage.setItem("cards", JSON.stringify(updated));
  };

  return (
    <div>
    <Navbar />
    <Sidebar  active="/preview" />
    <div className="main">
      

     <div className="card-grid">
   {cards.length === 0 ? (
            <p>No cards yet</p>
          ) : (
            cards.map((card) => (
               <CardPreview
        key={card.id}
        data={card}
        className="small-card"
        onClick={() => navigate(`/manage/${card.id}`)}
      />
            ))
  )}
</div>
    </div>
    </div>
  );
};

export default Previewpage;