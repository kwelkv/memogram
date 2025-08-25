import React, { useState } from "react";
import "./ApproveModal.css";

const ApproveModal = ({ isOpen, onConfirm, onCancel, message }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!lat.trim() || !lng.trim()) {
      setError("위도와 경도를 모두 입력하세요.");
      return;
    }
    onConfirm({ lat, lng });
    setLat("");
    setLng("");
    setError("");
  };

  const handleCancel = () => {
  onCancel("작업이 취소되었습니다."); // 취소 메시지 전달
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="location-inputs">
          <input
            type="text"
            placeholder="위도"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="text"
            placeholder="경도"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>승인</button>
          <button className="cancel-btn" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
