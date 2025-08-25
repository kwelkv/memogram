import React, { useState } from "react";
import "./Notice.css";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import useDeleteWithModal from "../../ConfirmModal/UseDeleteWithModal";

const Notice = () => {
  const handleDelete = (id) => {
  setNotices((prev) => prev.filter((notice) => notice.id !== id));
};
    // 커스텀 훅을 통한 삭제 모달 처리
    const {
      isOpen,
      openModal,
      confirmDelete,
      cancelDelete,
    } = useDeleteWithModal(handleDelete);


  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "6월 시스템 점검 안내",
      content: "6월 30일 02:00 ~ 05:00까지 시스템 점검이 있습니다.",
      date: "2025-06-25",
    },
    {
      id: 2,
      title: "신규 기능 업데이트",
      content: "지점별 통계 조회 기능이 추가되었습니다.",
      date: "2025-06-24",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNotice = () => {
    if (!newTitle || !newContent) return;

    const newNotice = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().slice(0, 10),
    };

    setNotices([newNotice, ...notices]);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="notice-container">
      <h2>공지사항</h2>

      <div className="notice-form">
        <input
          type="text"
          placeholder="공지 제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="공지 내용"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={handleAddNotice}>공지 등록</button>
      </div>

      <div className="notice-list">
        {notices.map((notice) => (
          <div className="notice-card" key={notice.id}>
            <div className="notice-header">
              <h3>{notice.title}</h3>
            </div>
            <p>{notice.content}</p>
            <button
              className="notice-delete-btn"
              onClick={() => openModal(notice.id)}
            >
              삭제
            </button>
          </div>
        ))}

      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="정말 삭제하시겠습니까?"
      />
      </div>
    </div>
  );
};

export default Notice;
