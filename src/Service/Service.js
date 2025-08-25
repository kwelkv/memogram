// src/services/Service.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // 엔드포인트 확정되면 수정

// 로그인 API
export const loginApi = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { username, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // accessToken, refreshToken, role 등
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

// 회원 삭제 API (관리자 전용)
export const deleteUserApi = async (id) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 관리자 토큰 가져오기

    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // { message: "삭제 완료" }
  } catch (error) {
    console.error("Delete User API Error:", error);
    throw error;
  }
};

// 점주 요청 목록 조회 API
export const getOwnershipRequestsApi = async () => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 관리자 토큰

    const response = await axios.get(`${API_BASE_URL}/admin/ownership/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 단일 객체로 내려와도 배열로 변환
    const data = response.data;
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Get Ownership Requests API Error:", error);
    throw error;
  }
};

// 점주 요청 승인 API
export const approveOwnershipRequestApi = async (requestId, payload) => {
  try {
    const token = sessionStorage.getItem("accessToken");

    const response = await axios.post(
      `${API_BASE_URL}/admin/ownership/requests/${requestId}/approve`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Approve Ownership Request API Error:", error);
    throw error;
  }
};

// 점주 요청 거절 API
export async function rejectOwnership(requestId, reason, token) {
  const url = `/api/admin/ownership/requests/${requestId}/reject`;
  const response = await axios.post(
    url,
    { reason }, // body
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
}