import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

// Register user
async function httpRegister(userData) {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.data) {
      localStorage.setItem("RECIPE_MANAGER_USER", JSON.stringify(response.data));

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
      localStorage.setItem("RECIPE_MANAGER_USER", JSON.stringify(response.data));

      return response.data;
    }
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Update user
async function httpUpdateUser(userData, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(`${API_URL}/me`, userData, config);

    if (response.data) {
      localStorage.setItem("RECIPE_MANAGER_USER", JSON.stringify(response.data));

      return response.data;
    }
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

async function httpRequestPasswordReset(email) {
  try {
    const response = await axios.post(`${API_URL}/password/requestResetPassword`, { email });

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

async function httpResetPassword(newPasswordData) {
  try {
    const response = await axios.post(`${API_URL}/password/resetPassword`, newPasswordData);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Logout user
function logout() {
  localStorage.removeItem("RECIPE_MANAGER_USER");
}

const authService = {
  httpRegister,
  httpLogin,
  httpUpdateUser,
  logout,
  httpRequestPasswordReset,
  httpResetPassword,
};

export default authService;
