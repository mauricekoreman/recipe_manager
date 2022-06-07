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
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);

    if (response.data) {
      localStorage.setItem("RECIPE_MANAGER_COOKBOOKS", JSON.stringify(response.data));
    }

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Get cookbook recipes
async function httpGetCookbookRecipes(cookbookId) {
  try {
    const response = await axios.get(`${API_URL}/${cookbookId}`);

    return response.data.recipes;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Add recipe to cookbook
async function httpAddRecipeToCookbook(data, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.patch(`${API_URL}/addRecipeToCookbooks`, data, config);
    console.log("response: ", response.data);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

const cookbooksService = {
  httpCreateCookbook,
  httpGetCookbooks,
  httpGetCookbookRecipes,
  httpAddRecipeToCookbook,
};

export default cookbooksService;