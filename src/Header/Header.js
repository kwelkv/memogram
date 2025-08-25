import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const username = sessionStorage.getItem("username") || "Guest";

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("로그아웃 되었습니다.");
    navigate("/");
  };

  // ✅ 드롭다운 외부 클릭 감지해서 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div className="profile-container" ref={dropdownRef}>
        <button className="profile-btn" onClick={() => setOpen((prev) => !prev)}>
          <BsPersonCircle size={24} />
        </button>

        {open && (
          <div className="dropdown-menu">
            <p className="dropdown-username">{username} 님</p>
            <button className="dropdown-logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;