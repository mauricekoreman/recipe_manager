import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/cookbooks";

// Create cookbook
async function httpCreateCookbook(cookbookTitle, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, cookbookTitle, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Getting user cookbooks
async function httpGetCookbooks(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
}

// Get cookbook recipes
async function httpGetCookbookRecipes(cookbookId) {
  const response = await axios.get(`${API_URL}/${cookbookId}`);

  return response.data.recipes;
}

const cookbooksService = {
  httpCreateCookbook,
  httpGetCookbooks,
  httpGetCookbookRecipes,
};

export default cookbooksService;
