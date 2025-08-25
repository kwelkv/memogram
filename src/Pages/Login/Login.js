// src/Login.js
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const Login = () => {

  // 입력값 필터링 함수 (아이디/비번에 불필요한 특수문자 제거)
  const sanitizeInput = (value) => {
  // 영문, 숫자, @, ., -, _ 만 허용
  return value.replace(/[^\w.@-]/g, "");
};

  // 입력 값 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  //navigate 기능 사용
  const navigate = useNavigate();

  // 임시 사용자 데이터
  const dummyUser = {
    username: "admin",
    password: "1234",
  };

    // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      setLoading(true);//로딩 시작
      // (나중에 axios.post 같은 실제 API 요청으로 대체 가능)
      await new Promise((resolve) => setTimeout(resolve, 300)); // 딜레이 흉내

      if (username === dummyUser.username && password === dummyUser.password) {
        // 세션스토리지에 로그인 상태 저장
        sessionStorage.setItem("token", "dummy_token"); // 실제 API 토큰 저장 예정
        sessionStorage.setItem("username", username);  // 로그인한 사용자 이름 저장
        toast.success("로그인 성공!");
        navigate("/home");
      } else {
        toast.error("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (err) {
      console.error(err);
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); //로딩 끝
    }
  };

  // Enter 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };


  return (
    <div className="login-wrapper">
        {loading && <Loading />} {/* 오버레이 로딩 */}
      <div className="login-container">
        <h2>LogIn</h2>

        <input type="text" 
        placeholder="아이디를 입력하세요"
        value={username}
        onChange={(e) => setUsername(sanitizeInput(e.target.value))} 
        onKeyDown={handleKeyDown}
        />
        <input type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(sanitizeInput(e.target.value))}
        onKeyDown={handleKeyDown}
        />

        <button className="login-btn" onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
