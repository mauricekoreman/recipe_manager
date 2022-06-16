import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/recipes";

// GET recipe
async function httpGetRecipeById(recipeId) {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Create recipe
async function httpCreateRecipe(recipeData, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, recipeData, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Update recipe
async function httpUpdateRecipe(recipeData, recipeId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(`${API_URL}/${recipeId}`, recipeData, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

const recipeService = {
  httpGetRecipeById,
  httpCreateRecipe,
  httpUpdateRecipe,
};

export default recipeService;
