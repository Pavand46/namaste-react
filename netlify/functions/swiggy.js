const axios = require("axios");

exports.handler = async function (event, context) {
  // This extracts the part of the URL that comes after '/swiggy/'
  // e.g., for a request to '/.netlify/functions/swiggy/restaurants/list', this will be 'restaurants/list'
  const apiPath = event.path.replace("/.netlify/functions/swiggy/", "");
  const queryString = new URLSearchParams(
    event.queryStringParameters
  ).toString();

  const SWIGGY_API_URL = `https://www.swiggy.com/dapi/${apiPath}?${queryString}`;

  try {
    console.log("Fetching from:", SWIGGY_API_URL); // This log will appear in your Netlify function logs

    const response = await axios.get(SWIGGY_API_URL, {
      headers: {
        // Swiggy API might require a browser-like User-Agent header
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching from Swiggy:", error.message);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: "Failed to fetch data from Swiggy" }),
    };
  }
};
