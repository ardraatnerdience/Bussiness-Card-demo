import React from "react";
import mobilepreviewicon from "../../assets/mobilepreviewicon.svg";
import mailpreviewicon from "../../assets/mailpreviewicon.svg";
import linkpreviewicon from "../../assets/linkpreviewicon.svg";
import locationpreviewicon from "../../assets/locationpreviewicon.svg";
import { QRCodeCanvas } from "qrcode.react";

const Cardpreview = ({ data,small ,onClick, className = "" , isExport}) => {

const qrValue = `${window.location.origin}/card/${data?.id || ""}`;

   const handleSaveContact = () => {
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.org}
TITLE:${data.title}
TEL:${data.phone}
EMAIL:${data.email}
URL:${data.website}
ADR:${data.location}
END:VCARD
  `;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${formData.name || "contact"}.vcf`;
  a.click();
};


 const getImageSrc = (img) => {
  if (!img) return null;

  // If already base64 or URL (saved data)
  if (typeof img === "string") return img;

  // If File object (live preview)
  if (img instanceof File || img instanceof Blob) {
    return URL.createObjectURL(img);
  }

  return null;
};

  return (
      <div
  className={`card ${className} ${isExport ? "export-mode" : ""}`}
  onClick={onClick}
>

      <div
        className="card-top"    
        style={{
  backgroundImage: data.backgroundImage
    ? `url(${getImageSrc(data.backgroundImage)})`
    : undefined
}}
      ></div>

      <div className="card-content">

        <div className="card-avatar">
          {data.photo && <img src={getImageSrc(data.photo)}  alt="profile" />}
        </div>

        <h2>{data.name || "John Doe"}</h2>
        <p>{data.title || "Job Title"}</p>
        <p className="org">{data.org || "Organization"}</p>

        {data.bio && <p className="bio">{data.bio}</p>}

        <div className="info">

          {data.phone && (
            <a href={`tel:${data.phone}`} className="info-row">
              <img src={mobilepreviewicon} />
              <span>{data.phone}</span>
            </a>
          )}

          {data.email && (
            <a href={`mailto:${data.email}`} className="info-row">
              <img src={mailpreviewicon} />
              <span>{data.email}</span>
            </a>
          )}

          {data.website && (
            <a
              href={
                data.website.startsWith("http")
                  ? data.website
                  : `https://${data.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="info-row"
            >
              <img src={linkpreviewicon} />
              <span>{data.website}</span>
            </a>
          )}

          {data.location && (
            <a
              href={`https://www.google.com/maps?q=${data.location}`}
              target="_blank"
              rel="noopener noreferrer"
              className="info-row"
            >
              <img src={locationpreviewicon} />
              <span>{data.location}</span>
            </a>
          )}
<div className="qr-section">
  <QRCodeCanvas value={qrValue} size={60} />
</div>
        </div>

                 {!isExport && ( <button className="save" onClick={handleSaveContact}>
                  Save Contact
                </button>)}
      </div>
    </div>
    
  );
};

export default Cardpreview;