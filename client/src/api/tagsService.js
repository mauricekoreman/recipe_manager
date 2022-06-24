import axios from "axios";

const API_URL = "/api/v1/tags";

// GET tags
async function httpGetTags() {
  const response = await axios.get(API_URL);
  return response.data[0];
}

const tagsService = {
  httpGetTags,
};

export default tagsService;
