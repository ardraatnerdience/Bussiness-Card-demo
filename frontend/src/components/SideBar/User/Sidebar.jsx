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
  className={location.pathname === "/editor" ? "active" : ""}
  onClick={() => navigate("/editor")}
>
                    <img src="/src/assets/editoricon.svg" />

                </button>

               <button
  className={location.pathname === "/preview" ? "active" : ""}
  onClick={() => navigate("/preview")}
>
                    <img src="/src/assets/eyepreview.svg" />

                </button>

               <button
  className={location.pathname === "/template" ? "active" : ""}
  onClick={() => navigate("/template")}
>
                    <img src="/src/assets/templateicon.svg" />

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