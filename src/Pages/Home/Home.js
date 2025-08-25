// src/Home.js
import React, { useEffect,useState } from "react";
import "./Home.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaUser, FaCalendarWeek, FaUsers } from "react-icons/fa";
import { WiTime3 } from "react-icons/wi";

  const dummyStats = {
  totalUsers: 120,
  activeStore: 580,
  todayApi: 9230,
  waitingApproval: 15230,
  };

  const topStores = [
    { rank: 1, name: "식당1", memos: 480 },
    { rank: 2, name: "식당2", memos: 390 },
    { rank: 3, name: "식당3", memos: 310 },
  ];

  const chartData = [
    { day: "월", apis: 80 },
    { day: "화", apis: 100 },
    { day: "수", apis: 120 },
    { day: "목", apis: 150 },
    { day: "금", apis: 110 },
    { day: "토", apis: 170 },
    { day: "일", apis: 130 },
  ];

const activityTypeConfig = {
  approve: { color: "bg-green-100", icon: "✔️" },
  api: { color: "bg-blue-100", icon: "🔑" },
  update: { color: "bg-yellow-100", icon: "✏️" },
  delete: { color: "bg-red-100", icon: "🗑️" },
  login: { color: "bg-gray-100", icon: "📜" },
};

const Home = () => {
  const [stats, setStats] = useState(dummyStats);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setStats(dummyStats);
    setActivities([
      { type: "approve", title: "새 점주 등록 승인", user: "김광수", time: "5분 전" },
      { type: "api", title: "API 키 생성", user: "이영희", time: "15분 전" },
      { type: "update", title: "매장 정보 수정", user: "박민수", time: "30분 전" },
      { type: "delete", title: "사용자 계정 삭제", user: "정미영", time: "1시간 전" },
      { type: "login", title: "에러 로그 확인", user: "관리자", time: "2시간 전" },
    ]);
  }, []);

  

  return (
    <div className="home-container">

      <main className="home-main">
        <h2>📊 대시보드</h2>
      <div className="stats-grid">
        {/* 총 사용자 */}
        <div className="stat-card">
          <div className="stat-icon">
            <FaUser size={22} />
          </div>
          <div className="stat-info">
            <p className="stat-label">총 사용자</p>
            <h3 className="stat-value">{stats.totalUsers.toLocaleString()}</h3>
            <p className="stat-change positive">+8.2%</p>
          </div>
        </div>

        {/* 활성 매장 */}
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarWeek size={22} />
          </div>
          <div className="stat-info">
            <p className="stat-label">활성 매장</p>
            <h3 className="stat-value">{stats.activeStore.toLocaleString()}</h3>
            <p className="stat-change negative">-3.1%</p>
          </div>
        </div>

        {/* 일일API 호출 */}
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers size={22} />
          </div>
          <div className="stat-info">
            <p className="stat-label">일일API 호출</p>
            <h3 className="stat-value">{stats.todayApi.toLocaleString()}</h3>
            <p className="stat-change positive">+12.5%</p>
          </div>
        </div>

        {/* 대기 중인 승인 */}
        <div className="stat-card">
          <div className="stat-icon">
            <WiTime3 size={22} />
          </div>
          <div className="stat-info">
            <p className="stat-label">대기 중인 승인</p>
            <h3 className="stat-value">{stats.waitingApproval.toLocaleString()}</h3>
            <p className="stat-change positive">+5.7%</p>
          </div>
        </div>
      </div>
        <div className="section">
          <h3>🏪 메모 수 기준 상위 매장 TOP 3</h3>
          <ul className="store-list">
            {topStores.map((store) => (
              <li key={store.rank}>
                {store.rank}. {store.name} - {store.memos}건
              </li>
            ))}
          </ul>
        </div>

<div className="section-row">
  {/* API 호출 통계 */}
  <div className="section half">
    <h3>📈 Api 호출 통계</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="apis"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* 최근 활동 */}
  <div className="section half">
    <h3>🕒 최근 활동</h3>
    <div className="activity-list">
      {activities.map((a, idx) => {
        const config = activityTypeConfig[a.type] || {};
        return (
          <div key={idx} className="activity-item">
            <div className={`activity-icon ${config.color}`}>{config.icon}</div>
            <div className="activity-info">
              <p className="activity-title">{a.title}</p>
              <span className="activity-sub">{`사용자: ${a.user} • ${a.time}`}</span>
            </div>
          </div>
        );
      })}
    </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
