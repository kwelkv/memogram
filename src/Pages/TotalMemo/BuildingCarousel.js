import React from "react";

const BuildingCarousel = ({ building, onNext, onPrev }) => {
  return (
    <div className="carousel-container">
      <span className="arrow" onClick={onPrev}>&lt;</span>
      <h2 className="building-name">{building.name}</h2>
      <span className="arrow" onClick={onNext}>&gt;</span>
    </div>
  );
};

export default BuildingCarousel;
