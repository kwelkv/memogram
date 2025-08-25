import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaStickyNote, FaUser, FaHeadset, FaBell, FaBuilding, FaKey } from "react-icons/fa";
import { RiMenuFoldLine } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo-text">3Dine</span>
          <button className="back-btn" onClick={toggleSidebar}>
            <RiMenuFoldLine size={20} />
          </button>
      </div>
      <ul className="menu-list">
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/home")}>
          <FaHome className="menu-icon" />
          <span className="menu-text">Home</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/totalmemo")}>
          <FaStickyNote className="menu-icon" />
          <span className="menu-text">전체 메모 관리</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/usermanager")}>
          <FaUser className="menu-icon" />
          <span className="menu-text">사용자 관리</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/servicecenter")}>
          <FaHeadset className="menu-icon" />
          <span className="menu-text">고객센터</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/notice")}>
          <FaBell className="menu-icon" />
          <span className="menu-text">알림 및 공지사항</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/buildingmanager")}>
          <FaBuilding className="menu-icon" />
          <span className="menu-text">지점 관리 현황</span>
        </button>
      </li>
      <li>
        <button className="menu-btn" onClick={() => handleNavigation("/memberapprove")}>
          <MdPersonAddAlt1 className="menu-icon" />
          <span className="menu-text">점주 등록 승인</span>
        </button>
        <button className="menu-btn" onClick={() => handleNavigation("/ownermanager")}>
          <BsPersonLinesFill className="menu-icon" />
          <span className="menu-text">점주 목록 관리</span>
        </button>
      </li>
      <li>
          <button className="menu-btn" onClick={() => handleNavigation("/tokenmanagement")}>
          <FaKey className="menu-icon" />
          <span className="menu-text">Refresh 토큰 관리</span>
        </button>
      </li>
      </ul>
    </div>
  );
};

export default Sidebar;
