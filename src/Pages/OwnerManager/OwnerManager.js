import React, { useState } from "react";
import "./OwnerManager.css";
import useDeleteWithModal from "../../ConfirmModal/UseDeleteWithModal";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

const dummyOwners = [
  { id: 1, businessNumber: "123-45-67890", businessName: "우리커피", storeName: "서울역점", ownerName: "김춘복" },
  { id: 2, businessNumber: "987-65-43210", businessName: "파리바게트", storeName: "강남점", ownerName: "마리아" },
  { id: 3, businessNumber: "555-11-22222", businessName: "한솥도시락", storeName: "홍대점", ownerName: "로버트" },
];

const OwnerManager = () => {
  const [owners, setOwners] = useState(dummyOwners);

  const { isOpen, openModal, confirmDelete, cancelDelete } =
    useDeleteWithModal((id) => {
      setOwners((prev) => prev.filter((o) => o.id !== id));
    });

  return (
    <div className="owner-manager-container">
      <h2>점주 관리</h2>
      <table>
        <thead>
          <tr>
            <th>사업 등록번호</th>
            <th>상호명</th>
            <th>가게 이름</th>
            <th>점주 이름</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.businessNumber}</td>
              <td>{owner.businessName}</td>
              <td>{owner.storeName}</td>
              <td>{owner.ownerName}</td>
              <td>
                <button
                  className="owner-delete-btn"
                  onClick={() => openModal(owner.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="정말 삭제하시겠습니까?"
      />
    </div>
  );
};

export default OwnerManager;
