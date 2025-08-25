import React, { useState } from "react";
import "./UserManager.css";
import useDeleteWithModal from "../../ConfirmModal/UseDeleteWithModal";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

const dummyUsers = [
  { id: 1, username: "user01", memoCount: 5, role: "관리자"},
  { id: 2, username: "user02", memoCount: 3, role: "일반 사용자"},
  { id: 3, username: "user03", memoCount: 7, role: "일반 사용자"},
];
const UserManager = () => {
  const [users, setUsers] = useState(dummyUsers);
  // 삭제 로직을 커스텀 훅으로 관리
  const {
    isOpen,
    openModal,
    confirmDelete,
    cancelDelete,
  } = useDeleteWithModal((id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  });

  return (
    <div className="user-manager-container">
      <h2>사용자 관리</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>사용자명</th>
            <th>메모 수</th>
            <th>권한</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.memoCount}</td>
              <td>{user.role}</td>
              <td>
                <button className="user-delete-btn" onClick={() => openModal(user.id)}>
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

export default UserManager;
