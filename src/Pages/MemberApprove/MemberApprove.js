import "./MemberApprove.css";
import React, {useState} from "react";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import useDeleteWithModal from "../../ConfirmModal/UseDeleteWithModal";
import ApproveModal from "../../ConfirmModal/ApproveModal";
import { toast } from "react-toastify";
import RejectModal from "../../ConfirmModal/RejectModal";

const MemberApprove = () => {
const initialUsers = [
  { id: 1, date: "2025-08-14 09:30:25", owner: "김춘복", business: "우리커피", type: "카페", email: "john.smith@email.com", status: "거부" },
  { id: 2, date: "2024-01-14 14:15:42", owner: "마리아", business: "파리바게트", type: "빵집", email: "maria.garcia@email.com", status: "승인" },
  { id: 3, date: "2024-01-14 11:20:18", owner: "데이빗", business: "인도", type: "음식점", email: "david.chen@email.com", status: "거부" },
  { id: 4, date: "2024-01-13 16:45:33", owner: "사라", business: "다이소", type: "매점", email: "sarah.johnson@email.com", status: "승인" },
  { id: 5, date: "2024-01-13 10:30:15", owner: "로바트", business: "한솥", type: "식당", email: "robert.wilson@email.com", status: "승인" },
];

const [users, setUsers] = useState(initialUsers);
const [isRefreshing, setIsRefreshing] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [actionType, setActionType] = useState(null);
  // isApproveOpen 모달
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // Reject모달
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectId, setRejectId] = useState(null);


  const { isOpen, openModal, confirmDelete, cancelDelete } = useDeleteWithModal((id) => {
    if (actionType === "delete") {
      setUsers((stores) => stores.filter((store) => store.id !== id));
    }
    if (actionType === "approve") {
      setUsers((stores) => stores.map((store) => store.id === id ? { ...store, status: "승인" } : store));
    }
    if (actionType === "reject") {
      setUsers((stores) => stores.map((store) => store.id === id ? { ...store, status: "거부" } : store));
    }
  });
  // 새로고침 버튼 핸들러
  const handleRefresh = () => {
  setIsRefreshing(true);
  setTimeout(() => {
    setUsers(initialUsers);
    setIsRefreshing(false);
  }, 500); // 0.5초 후 초기화
};

  // 버튼 클릭 시 액션타입을 먼저 세팅
  const handleAction = (type, id) => {
    setActionType(type);
    openModal(id);
  };

    // 승인 버튼 클릭
  const handleApproveClick = (id) => {
    setSelectedId(id);
    setIsApproveOpen(true);
  };
  
  // 승인 모달 확인
  const handleApproveConfirm = ({ lat, lng }) => {
    setUsers((stores) =>
      stores.map((store) =>
        store.id === selectedId
          ? { ...store, status: "승인", lat, lng }
          : store
      )
    );
    setIsApproveOpen(false);
    setSelectedId(null);

    toast.success("작업이 완료되었습니다");
  };

  const handleRejectClick = (id) => {
  setRejectId(id);
  setIsRejectOpen(true);
};

  const handleRejectConfirm = (reason) => {
    setUsers((stores) =>
      stores.map((store) =>
        store.id === rejectId ? { ...store, status: "거부", rejectReason: reason } : store
      )
    );
    setIsRejectOpen(false);
    setRejectId(null);

    console.log("거절 사유:", reason); // API 나중에 연결하면 이 값 보내면 됨
    toast.error("거절 처리되었습니다");
};

  //정렬 핸들러
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({key, direction});
  };
  // 정렬된 데이터
  const sortedUsers = [...users].sort((a,b) => {
    if (!sortConfig.key) return 0;
    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];

    //날짜
    if (sortConfig.key === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }
    else if (sortConfig.key === "status") {
      const order = { "승인": 1, "거부": 2 };
      return sortConfig.direction === "asc"
        ? order[valueA] - order[valueB] // valueA vs valueB 비교
        : order[valueB] - order[valueA];
    }
    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? -1 : 1;
    return 0;
  });

  // 전체 숫자 통계 (위에 4개 데이터)
  const approvedCount = users.filter((u) => u.status === "승인").length;
  const rejectedCount = users.filter((u) => u.status === "거부").length;
  // 오늘 날짜 (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];
  // 오늘 신청한 인원
  const todayCount = users.filter((u) => u.date.startsWith(todayStr)).length;

  //--------------------------------------------------------
  return (
    <div className="approval-container">
      <h1 className="title">점주 승인 목록 대기 표</h1>

      {/* 상단 카드 */}
      <div className="stats-container">
      <StatCard label="총 인원" value={users.length} />
      <StatCard label="당일 신청자 수" value={todayCount} />
      <StatCard label="승인 수" value={approvedCount} />
      <StatCard label="거절 수" value={rejectedCount} />
      </div>

      {/* 필터 영역 */}
      <div className="filter-bar">
        <select className="status-select" onChange={(e) => {
          const value = e.target.value;
          if (value === "신청일 순") handleSort("date");
          if (value === "승인 상태 여부") handleSort("status");
        }}>
          <option>신청일 순</option>
          <option>승인 상태 여부</option>
        </select>
        <div className="filter-actions">
          <button className="btn export">Export</button>
        <button className="btn refresh" onClick={handleRefresh}>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
        </div>
      </div>

      {/* 테이블 */}
      <table className="approval-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>신청일</th>
            <th onClick={() => handleSort("owner")}>점주 명</th>
            <th onClick={() => handleSort("business")}>지점 명</th>
            <th onClick={() => handleSort("type")}>종류</th>
            <th onClick={() => handleSort("email")}>EMAIL</th>
            <th onClick={() => handleSort("status")}>상태</th>
            <th>승인버튼</th>
          </tr>
        </thead>
        <tbody>
        {sortedUsers.map((row) => (
        <tr key={row.id}>
        <td>{row.date}</td>
        <td>{row.owner}</td>
        <td>{row.business}</td>
        <td>{row.type}</td>
        <td>{row.email}</td>
        <td>1</td>
        <td>
        <span
        className={`status-badge ${row.status.replace(" ", "-").toLowerCase()}`}>
        {row.status}
        </span>
        </td>
        <td>
          <div className="action-buttons">
            <button
              className="approve-btn"
              onClick={() => handleApproveClick(row.id)}>
              승인
            </button>
            <button
              className="reject-btn"
              onClick={() => handleRejectClick(row.id)}
            >
              거절
            </button>
            <button className="store-delete-btn" onClick={() => handleAction("delete", row.id)}>삭제</button>
          </div>
        </td>
        </tr>
        ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={
          actionType === "delete" ? "정말 삭제하시겠습니까?" :
          actionType === "approve" ? "정말 승인하시겠습니까?" :
          "정말 거절하시겠습니까?"
        }
      />
      {/* 승인 전용 모달 */}
      <ApproveModal
        isOpen={isApproveOpen}
        onConfirm={handleApproveConfirm}
        onCancel={() => {
          setIsApproveOpen(false);
          toast.info("작업이 취소되었습니다.");
        }}
        message="승인하시려면 위도와 경도를 입력하세요."
      />
      {/* 승인 거절 모달 */}
      <RejectModal
        isOpen={isRejectOpen}
        onConfirm={handleRejectConfirm}
        onCancel={() => {
          setIsRejectOpen(false);
          toast.info("거절이 취소되었습니다.");
        }}
/>
    </div>
  );
};

function StatCard({ label, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}

export default MemberApprove;
