import React, { useState } from "react";
import "./TokenManagement.css";

const TokenManagement = () => {
  const [tokens, setTokens] = useState([
    {
      id: 1,
      userId: "user001",
      email: "user001@test.com",
      tokenPrefix: "abcd12****wxyz",
      issuedAt: "2025-08-01 12:00",
      expiresAt: "2025-09-01 12:00",
      status: "ACTIVE",
    },
    {
      id: 2,
      userId: "user002",
      email: "user002@test.com",
      tokenPrefix: "efgh34****uvwx",
      issuedAt: "2025-07-20 08:30",
      expiresAt: "2025-08-20 08:30",
      status: "EXPIRED",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState([]);

  // 개별 revoke
  const handleRevoke = (id) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "REVOKED" } : t
      )
    );
  };

  // 체크박스 선택/해제
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 전체선택
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelected(filteredTokens.map((t) => t.id));
    } else {
      setSelected([]);
    }
  };

  // Bulk revoke
  const handleBulkRevoke = () => {
    setTokens((prev) =>
      prev.map((t) =>
        selected.includes(t.id) ? { ...t, status: "REVOKED" } : t
      )
    );
    setSelected([]);
  };

  // 검색 + 필터 적용된 토큰 리스트
  const filteredTokens = tokens.filter((t) => {
    const matchesSearch =
      t.userId.includes(search) || t.email.includes(search);
    const matchesFilter = filter === "all" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="refresh-token-container">
      <h2 className="refresh-token-title">리프레시 토큰 관리</h2>

      {/* 검색/필터 */}
      <div className="refresh-token-actions">
        <input
          type="text"
          placeholder="userId 또는 email 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="refresh-token-search"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="refresh-token-filter"
        >
          <option value="all">전체</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="REVOKED">REVOKED</option>
          <option value="EXPIRED">EXPIRED</option>
        </select>
        <button
          onClick={handleBulkRevoke}
          className="refresh-token-btn-bulk"
          disabled={selected.length === 0}
        >
          Bulk Revoke
        </button>
      </div>

      {/* 토큰 리스트 */}
      <table className="refresh-token-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selected.length > 0 &&
                  selected.length === filteredTokens.length
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th>User ID</th>
            <th>Email</th>
            <th>Token Prefix</th>
            <th>Issued At</th>
            <th>Expires At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTokens.map((t) => (
            <tr key={t.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => handleSelect(t.id)}
                />
              </td>
              <td>{t.userId}</td>
              <td>{t.email}</td>
              <td>{t.tokenPrefix}</td>
              <td>{t.issuedAt}</td>
              <td>{t.expiresAt}</td>
              <td
                className={`refresh-token-status ${
                  t.status === "ACTIVE"
                    ? "active"
                    : t.status === "EXPIRED"
                    ? "expired"
                    : "revoked"
                }`}
              >
                {t.status}
              </td>
              <td>
                {t.status === "ACTIVE" && (
                  <button
                    className="refresh-token-btn-revoke"
                    onClick={() => handleRevoke(t.id)}
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenManagement;
