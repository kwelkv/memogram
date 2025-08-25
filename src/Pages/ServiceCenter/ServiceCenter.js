import React, { useState } from "react";
import "./ServiceCenter.css";

const ServiceCenter = () => {
  const [inquiries] = useState([
    { id: 1, user: "user01", question: "이용 방법이 궁금해요.", status: "대기중" },
    { id: 2, user: "user02", question: "비밀번호를 잊어버렸어요.", status: "처리 완료" },
  ]);

  return (
    <div className="service-center-container">
      <h2>고객센터</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>작성자</th>
            <th>문의 내용</th>
            <th>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.question}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceCenter;
