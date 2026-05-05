import React from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-top">

                <button
  className={location.pathname === "/admin" ? "active" : ""}
  onClick={() => navigate("/admin")}
>
                    <img src="/src/assets/Overviewicon.svg" />

                </button>

               <button
  className={location.pathname === "/users" ? "active" : ""}
  onClick={() => navigate("/users")}
>
                    <img src="/src/assets/usericon.svg" />

                </button>

               <button
  className={location.pathname === "/cards" ? "active" : ""}
  onClick={() => navigate("/cards")}
>
                    <img src="/src/assets/cardicon.svg" />

                </button>

            </div>

            <div className="sidebar-bottom">
                <button>
                    <img src="/src/assets/logut.svg" />

                </button>
            </div>
        </div>
    );
};

export default Sidebar;