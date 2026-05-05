import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import Editorpage from './components/EditorPage/Editorpage.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Templatepage from './components/TemplatePage/Templatepage'
import Previewpage from './components/PreviewPage/Previewpage';
import ManageCard from './components/ManageCard/ManageCard.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AdminCards from './components/Admin/AdminCards.jsx';
import AdminManageCard from "./components/Admin/AdminManageCard";
import PublicCard from "./components/PublicCard.jsx";



function App ()  {
  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<Editorpage />}/>
        <Route path='/preview' element={<Previewpage/>}/>
        <Route path="/manage/:id" element={<ManageCard />} />
        <Route path="/edit/:id" element={<Editorpage />} />
         <Route path='/template' element={<Templatepage/>}/>
         <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cards" element={<AdminCards />} />
        <Route path="/admin/manage/:id" element={<AdminManageCard />} />
<Route path="/card/:id" element={<PublicCard />} />
      </Routes>
    </Router>
  )
}

export default App
