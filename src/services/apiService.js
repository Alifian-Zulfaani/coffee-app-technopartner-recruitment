// /src/services/apiService.js
import axios from "axios";

const API_URL = "https://soal.staging.id/oauth/token";
const HOME_API_URL = "https://soal.staging.id/api/home";
const MENU_API_URL = "https://soal.staging.id/api/menu";

export const login = async (username, password) => {
  const data = new URLSearchParams({
    grant_type: "password",
    client_id: "e78869f77986684a",
    client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
    username,
    password,
  });

  try {
    const response = await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const { token_type, access_token } = response.data;
    return `${token_type} ${access_token}`; // return token
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw new Error(
        error.response.data.error_description || "Invalid credentials"
      );
    } else {
      console.error("Network Error:", error.message);
      throw new Error("Network error. Please try again.");
    }
  }
};

export const getHomeData = async (token) => {
  try {
    // console.log("Token yang dikirim untuk Home:", token);
    const response = await axios.get(HOME_API_URL, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching home data:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch home data");
  }
};

export const getMenuData = async (token) => {
  // console.log("Token yang dikirimkan untuk Menu:", token);
  const body = {
    show_all: 1,
  };

  try {
    const response = await axios.post(MENU_API_URL, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    throw new Error("Failed to fetch menu data");
  }
};
