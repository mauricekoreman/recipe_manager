import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

// Register user
async function httpRegister(userData) {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    }
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Login user
async function httpLogin(userData) {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    }
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Logout user
function logout() {
  localStorage.removeItem("user");
}

const requests = {
  httpRegister,
  logout,
  httpLogin,
};

export default requests;
