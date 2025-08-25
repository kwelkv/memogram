// src/components/Loading.js
import React from "react";
import Lottie from "lottie-react";
import Food from "../assets/Spoon.json"; // 경로 확인!

const Loading = () => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)", // 반투명 배경
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999 // 제일 위로
    }}>
      <Lottie
        animationData={Food}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default Loading;
