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

// Get cookbooks containing a specific recipe
async function httpGetCookbooksWithRecipe(recipeId) {
  try {
    const response = await axios.get(`${API_URL}/withRecipe/${recipeId}`);
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

const cookbooksService = {
  httpCreateCookbook,
  httpGetCookbooks,
  httpDeleteCookbook,
  httpGetCookbooksWithRecipe,
};

export default cookbooksService;
