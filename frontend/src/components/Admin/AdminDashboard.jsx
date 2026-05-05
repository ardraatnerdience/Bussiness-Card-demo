import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Admin/Sidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {


    const [cards, setCards] = useState([]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("cards")) || [];
  setCards(stored);
}, []); 


    


const weeklyData = Array(7).fill(0);

cards.forEach(card => {
  if (!card.createdAt) return;

  const created = new Date(card.createdAt);
  const diffDays = Math.floor(
    (Date.now() - created) / (1000 * 60 * 60 * 24)
  );

  if (diffDays >= 0 && diffDays < 7) {
    weeklyData[6 - diffDays]++;
  }
});

const maxValue = Math.max(...weeklyData, 1);

// total cards
const totalCards = cards.length;

// unique users (based on email)
const uniqueUsers = new Set(cards.map(c => c.email)).size;

// active users 
const activeUsers = uniqueUsers;


const recentCards = [...cards].slice(-4).reverse();

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="admin-main">

        {/* TOP STATS */}
        <div className="stats-row">

          <div className="stat-card">
            <div className="stat-top">
              <div className="icon blue">👤</div>
            </div>
           <h2>{uniqueUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div className="icon blue">📄</div>
            </div>
            <h2>{totalCards}</h2>
<p>Active Cards</p> 
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <div className="icon blue">👥</div>
            </div>
            <h2>{activeUsers}</h2>
<p>Active Users</p>
          </div>

        </div>

        {/* MAIN SECTION */}
        <div className="dashboard-grid">

          {/* CHART */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>System Activity</h2>
                <p>User registrations over the last 7 days</p>
              </div>

              <div className="toggle">
                <span>Monthly</span>
                <span className="active">Weekly</span>
              </div>
            </div>
<div className="labels">
  {["M","T","W","T","F","S","S"].map((d, i) => (
    <span key={i}>{d}</span>
  ))}
</div>

   <div className="bars">
  {weeklyData.map((val, i) => {
    const height = (val / maxValue) * 150 + 20;

    return (
      <div key={i} className="bar-wrapper">
        <div
          className={`bar ${i === 6 ? "blue" : ""}`}
          style={{ height: `${height}px` }}
        ></div>
      </div>
    );
  })}
</div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="activity-card">
            <h2>Recent Activity</h2>

            {recentCards.map((card, i) => (
  <div className="activity-item" key={i}>
    <span className="dot blue"></span>
    <div>
      <p><b>{card.name}</b> created a card</p>
      <small>{new Date(card.createdAt).toLocaleString()}</small>
    </div>
  </div>
))}

            <button className="log-btn">View Detailed Log</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;