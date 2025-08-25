import React, { useState } from "react";
import "./BuildingManager.css";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import useDeleteWithModal from "../../ConfirmModal/UseDeleteWithModal";

const initialBuildings = [
  { id: 1, name: "지점 1", location: "계족로", comments: 12, likes: 35 },
  { id: 2, name: "지점 2", location: "서문", comments: 5, likes: 22 },
  { id: 3, name: "지점 3", location: "동문", comments: 8, likes: 18 },
];

const BuildingManager = () => {
    const [buildings, setBuildings] = useState(initialBuildings);
    // 커스텀 훅을 통한 삭제 모달 처리
    const {
      isOpen,
      openModal,
      confirmDelete,
      cancelDelete
    } = useDeleteWithModal((idToDelete) => {
      setBuildings((prev) => prev.filter((b) => b.id !== idToDelete));
    }); 

    const handleViewAll = () => {
    window.open("https://map.naver.com", "_blank");
  };

  return (
    <div className="bm-container">
      <h2>지점 관리</h2>

      <table className="bm-table">
        <thead>
          <tr>
            <th>지점명</th>
            <th>위치</th>
            <th>댓글 수</th>
            <th>추천 수</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building) => (
            <tr key={building.id}>
              <td>{building.name}</td>
              <td>{building.location}</td>
              <td>{building.comments}</td>
              <td>{building.likes}</td>
              <td>
                <button
                  className="bm-delete-btn"
                  onClick={() => openModal(building.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bm-view-all-wrapper">
        <button className="bm-view-all-btn" onClick={handleViewAll}>
          지점 전체 보기
        </button>
      </div>

      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="정말 삭제하시겠습니까?"
      />
    </div>
  );
};

export default BuildingManager;
