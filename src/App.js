import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import TotalMemo from "./Pages/TotalMemo/TotalMemo";
import UserManager from "./Pages/UserManager/UserManager";
import ServiceCenter from "./Pages/ServiceCenter/ServiceCenter";
import Notice from "./Pages/Notice/Notice";
import BuildingManager from "./Pages/BuildingManager/BuildingManager";
import MemberApprove from "./Pages/MemberApprove/MemberApprove";
import OwnerManager from "./Pages/OwnerManager/OwnerManager";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Header from "./Header/Header";
import TokenManagement from "./Pages/TokenManagement/TokenManagement";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Router>
      <MainLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
};

const MainLayout = ({ isSidebarOpen, toggleSidebar, closeSidebar }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="app-container">
      {!isLoginPage && (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Header/>
          {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
        </>
      )}
        <main   className={`main-content ${
        !isLoginPage && isSidebarOpen ? "shifted" : ""
        }`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/totalmemo" element={<ProtectedRoute><TotalMemo /></ProtectedRoute>} />
          <Route path="/usermanager" element={<ProtectedRoute><UserManager /></ProtectedRoute>} />
          <Route path="/servicecenter" element={<ProtectedRoute><ServiceCenter /></ProtectedRoute>} />
          <Route path="/notice" element={<ProtectedRoute><Notice/></ProtectedRoute>}/>
          <Route path="/buildingmanager" element={<ProtectedRoute><BuildingManager/></ProtectedRoute>} />
          <Route path="memberapprove" element={<ProtectedRoute><MemberApprove/></ProtectedRoute>} />
          <Route path="ownermanager" element={<ProtectedRoute><OwnerManager/></ProtectedRoute>} />
          <Route path="/tokenmanagement" element={<ProtectedRoute><TokenManagement/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
