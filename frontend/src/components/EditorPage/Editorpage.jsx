import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/User/Sidebar";
import emailIcon from "../../assets/emailIcon.svg";
import mobileIcon from "../../assets/mobileIcon.svg";
import linkIcon from "../../assets/linkIcon.svg";
import locationpreviewicon from "../../assets/locationpreviewicon.svg";
import defaultprofile from "../../assets/defaultprofile.svg";
import "./Editorpage.css";
import CardPreview from "../CardPreview/Cardpreview";
import { useParams } from "react-router-dom";

const Editorpage = () => {
  const { id } = useParams();

  const [active, setActive] = useState("editor");
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    org: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    photo: null,
    backgroundImage: null
  });

  // ✅ Convert image to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // ✅ Load existing card if editing
  useEffect(() => {
    if (id) {
      const cards = JSON.parse(localStorage.getItem("cards")) || [];
      const existing = cards.find((c) => String(c.id) === id);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id]);

  // ✅ SAVE (fixed)
  const handleSave = () => {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];

    let updated;

    if (id) {
      // EDIT
      updated = cards.map((c) =>
        String(c.id) === id ? { ...formData, id } : c
      );
    } else {
      // NEW
      updated = [
        ...cards,
        {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
      ];
    }

    localStorage.setItem("cards", JSON.stringify(updated));
    alert("Saved!");
  };

  // ✅ DISCARD
  const handleDiscard = () => {
    setFormData({
      name: "",
      title: "",
      org: "",
      bio: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      photo: null,
      backgroundImage: null
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar active={active} setActive={setActive} />

      <div className="main">

        {/* LEFT FORM */}
        <div className="form">

          <h1>Editor Workspace</h1>
          <p className="subtitle">
            Craft your digital presence with editorial precision.
          </p>

          {/* PROFILE */}
          <div className="profile-row">
            <div
              className="avatar"
              onClick={() => fileInputRef.current.click()}
            >
              {formData.photo ? (
                <img src={formData.photo} alt="profile" />
              ) : (
                <img src={defaultprofile} alt="default" />
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                const base64 = await toBase64(file);
                setFormData({ ...formData, photo: base64 });
              }}
            />

            <input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* TITLE + ORG */}
          <div className="row">
            <input
              placeholder="Enter your job title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              placeholder="Enter your organization"
              value={formData.org}
              onChange={(e) =>
                setFormData({ ...formData, org: e.target.value })
              }
            />
          </div>

          {/* BIO */}
          <input
            className="bioinput"
            placeholder="Briefly describe your role..."
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />

          {/* BACKGROUND IMAGE */}
          <h3>Background Image</h3>
          <div
            className="bg-upload"
            onClick={() => bgInputRef.current.click()}
          >
            {formData.backgroundImage ? (
              <img src={formData.backgroundImage} alt="bg" />
            ) : (
              <span>Click to upload background</span>
            )}
          </div>

          <input
            type="file"
            ref={bgInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              const base64 = await toBase64(file);
              setFormData({
                ...formData,
                backgroundImage: base64
              });
            }}
          />

          {/* CONTACT */}
          <h3>Contact Channels</h3>

          <div className="contact-channels">

            <div className="row">
              <img src={emailIcon} className="input-icon" />
              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <img src={mobileIcon} className="input-icon" />
              <input
                placeholder="Mobile"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="row">
              <img src={linkIcon} className="input-icon" />
              <input
                placeholder="Website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />

              <img src={locationpreviewicon} className="input-icon" />
              <input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button className="primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="secondary" onClick={handleDiscard}>
              Discard
            </button>
          </div>

        </div>

        {/* RIGHT PREVIEW */}
        <div className="preview">
          <div className="preview-bg">
            <CardPreview data={formData} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Editorpage;