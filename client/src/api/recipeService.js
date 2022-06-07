import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/recipes";

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

const recipeService = {
  httpCreateRecipe,
};

export default recipeService;
