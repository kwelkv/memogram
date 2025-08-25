import React, { useState } from "react";
// 건물 별 화살표
import BuildingCarousel from "./BuildingCarousel";
import "./TotalMemo.css";

const buildingData = [
  {
    name: "지점1",
    memos: [
      { id: 1, author: "user01", content: "지점 메모 1", location: "지점1" },
      { id: 2, author: "user02", content: "지점 메모 2", location: "지점1" },
    ]
  },
  {
    name: "지점2",
    memos: [
      { id: 3, author: "user03", content: "지점2 메모 1", location: "지점2" },
      { id: 4, author: "user04", content: "지점2 메모 2", location: "지점2" },
    ]
  },
  {
    name: "지점3",
    memos: [
      { id: 5, author: "user05", content: "지점3 메모 1", location: "지점3" },
    ]
  }
];


const TotalMemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? buildingData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="total-memo-container">
      <BuildingCarousel
        building={buildingData[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <div className="memo-list">
        {buildingData[currentIndex].memos.map((memo) => (
          <div key={memo.id} className="memo-item">
            <p><strong>작성자 ID:</strong> {memo.author}</p>
            <p><strong>작성 지점:</strong> {memo.location}</p>
            <p><strong>내용:</strong> {memo.content}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalMemo;
