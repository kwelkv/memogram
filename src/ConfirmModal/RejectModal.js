// src/components/RejectModal.js
import React, { useState } from "react";
import "./RejectModal.css"; // 별도 스타일

const RejectModal = ({ isOpen, onConfirm, onCancel, message }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("거절 사유를 입력하세요.");
      return;
    }
    onConfirm(reason);
    setReason("");
    setError("");
  };

  const handleCancel = () => {
    setReason("");
    setError("");
    onCancel("작업이 취소되었습니다.");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <textarea
          placeholder="거절 사유를 입력하세요"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="reason-textarea"
        />
        {error && <p className="error-text">{error}</p>}
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>거절</button>
          <button className="cancel-btn" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
