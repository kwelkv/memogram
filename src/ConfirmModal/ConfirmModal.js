import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null; // 열리지 않으면 렌더링 안 함

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>확인</button>
          <button className="cancel-btn" onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
