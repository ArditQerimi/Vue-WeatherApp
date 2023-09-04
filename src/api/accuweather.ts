import axios from "axios";

// const API_KEY = "hYP3CxxmGiiRr7Sicvs5eEI1ME253GqP";
// const API_KEY = "PIw72Ggk3psaqnAQamyGNGHpAEYcOpov";
const API_KEY = `YjMRGAgy5g7n0cll0FhsXrqeduLbAjRU`;
// const API_KEY = `JK52vNn44d8E9Fci8zltZvzfFpmm4kZf`;
const ACCUWEATHER_BASE_URL = "https://dataservice.accuweather.com";

export async function getLocation(query) {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}/locations/v1/cities/autocomplete`,
      {
        params: {
          q: query,
          apikey: API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentWeather(locationKey) {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFiveDaysWeather(locationKey) {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}/forecasts/v1/daily/5day/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
          language: "en-us",
        },
      },
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
export async function getLocationWeatherByKey(locationKey) {
  try {
    const response = await axios.get(
      `${ACCUWEATHER_BASE_URL}/locations/v1/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
          language: "en-us",
        },
      },
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
