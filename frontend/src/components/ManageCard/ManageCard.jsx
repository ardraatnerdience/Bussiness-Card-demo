import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/User/Sidebar";
import CardPreview from "../CardPreview/CardPreview";
import "./ManageCard.css";
import ManageEdit from '../../assets/ManageEdit.svg'
import ManageExport from '../../assets/ManageExport.svg'
import ManageCopy from '../../assets/ManageCopy.svg'
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ManageCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

const cardRef = useRef();

  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const card = cards.find((c) => String(c.id) === id);

  if (!card) return <h2 style={{ marginLeft: "200px", marginTop: "100px" }}>Card not found</h2>;

  const handleDelete = () => {
    const updated = cards.filter((c) => String(c.id) !== id);
    localStorage.setItem("cards", JSON.stringify(updated));
    navigate("/preview");
  };



const handleDownloadPDF = async () => {
  const element = document.getElementById("pdfCard");

  const canvas = await html2canvas(element, {
    scale:2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  // 👉 ADD EXTRA SPACE AROUND CARD
  const padding = 80;

  const pdfWidth = canvas.width + padding;
  const pdfHeight = canvas.height + padding;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pdfWidth, pdfHeight]
  });

  const x = padding / 2;
  const y = padding / 2;

  pdf.addImage(imgData, "PNG", x, y, canvas.width, canvas.height);

  pdf.save(`${card.name || "card"}.pdf`);
};

  const handleCopy = () => {
  const link = `${window.location.origin}/card/${card.id}`;
  navigator.clipboard.writeText(link);
  alert("Link copied!");
};



  return (
    <div>
      <Navbar />
      <Sidebar active="preview" />

      <div className="manage-wrapper">

        {/* LEFT SIDE */}
        <div className="manage-left">
          <div className="manage-preview-bg">
             <div ref={cardRef}>
            <CardPreview data={card} />
             </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="manage-right">
          <h1>Manage Card</h1>
          <p>
            Your digital presence is synced across all platforms.
            Update your details or share your profile instantly.
          </p>

          <div
            className="action-card"
            onClick={() => navigate(`/edit/${id}`)}
          >
            <div className="icon-circle"><img src={ManageEdit}/></div>
            Edit Details
          </div>

          <div className="action-card" onClick={handleCopy}>
            <div className="icon-circle" ><img src={ManageCopy}/></div>
            Copy Link
          </div>

          <div className="action-card" onClick={handleDownloadPDF}>
            <div className="icon-circle"><img src={ManageExport}/></div>
            Export
          </div>

          <div className="action-card delete" onClick={handleDelete}>
            <div className="icon-circle">🗑️</div>
            Delete
          </div>

        </div>

      </div>
     <div id="pdfCard" style={{ position: "absolute", left: "-9999px" }}>
  <CardPreview data={card} isExport={true} />
</div>
    </div>
  );
};

export default ManageCard;