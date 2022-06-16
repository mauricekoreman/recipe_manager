import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/cookbooks";
const API_URL_RECIPES = "http://localhost:8000/api/v1/recipes";

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

    // if (response.data) {
    //   localStorage.setItem("RECIPE_MANAGER_COOKBOOKS", JSON.stringify(response.data));
    // }

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

async function httpGetUserRecipes(token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL_RECIPES, config);
    return response.data;
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
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Delete cookbook
async function httpDeleteCookbook(cookbookId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(`${API_URL}/${cookbookId}`, config);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

const cookbooksService = {
  httpCreateCookbook,
  httpGetCookbooks,
  httpGetCookbookRecipes,
  httpGetUserRecipes,
  httpAddRecipeToCookbook,
  httpDeleteCookbook,
};

export default cookbooksService;
