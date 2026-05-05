import React from "react";
import { useParams } from "react-router-dom";
import CardPreview from "./CardPreview/Cardpreview";

const PublicCard = () => {
  const { id } = useParams();

  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const card = cards.find((c) => String(c.id) === id);

  if (!card) return <h2>Card not found</h2>;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f2f2f2"
    }}>
      <CardPreview data={card} />
    </div>
  );
};

export default PublicCard;