import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/recipes";
const API_URL_COOKBOOKS = "http://localhost:8000/api/v1/cookbooks";

// GET recipe
async function httpGetRecipeById(recipeId) {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Get cookbook recipes
async function httpGetCookbookRecipes(cookbookId) {
  try {
    const response = await axios.get(`${API_URL_COOKBOOKS}/${cookbookId}`);

    return response.data.recipes;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

async function httpGetCookbookFilteredRecipes(tags, cookbookId) {
  try {
    const queryParams = {
      tags: tags,
    };

    const params = new URLSearchParams(queryParams);

    const response = await axios.get(`${API_URL_COOKBOOKS}/${cookbookId}/search?${params}`);

    return response.data.recipes;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Get user recipes for 'All-recipes' cookbook
async function httpGetUserRecipes(token) {
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

async function httpUserGetFilteredRecipes(tags, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const queryParams = {
      tags: tags,
    };

    const params = new URLSearchParams(queryParams);

    const response = await axios.get(`${API_URL}/search?${params}`, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Create recipe
async function httpCreateRecipe(data, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, data, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Update recipe
async function httpUpdateRecipe({ recipeId, data }, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(`${API_URL}/${recipeId}`, data, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

// Delete recipe
async function httpDeleteRecipe(recipeId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(`${API_URL}/${recipeId}`, config);

    return response.data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
}

const recipeService = {
  httpGetRecipeById,
  httpGetCookbookRecipes,
  httpGetCookbookFilteredRecipes,
  httpGetUserRecipes,
  httpUserGetFilteredRecipes,
  httpCreateRecipe,
  httpUpdateRecipe,
  httpDeleteRecipe,
};

export default recipeService;
