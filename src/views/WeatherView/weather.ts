import {
  getLocation,
  getCurrentWeather,
  getFiveDaysWeather,
  getLocationWeatherByKey,
} from "@/api/accuweather";

const state = {
  weatherLocations: [],
  currentWeather: {},
  forecastWeather: {},
  selectedLocation: {},
  favoritesLocations: [],
  locationByKey: {},
  error: {
    isVisible: false,
    title: "Error",
    message: "",
  },
};

const mutations = {
  setLocationByKey(state, location) {
    state.locationByKey = location;
  },
  setToFavorites(state, location) {
    state.favoritesLocations.push(location);
  },
  removeFromFavorites(state, location) {
    state.favoritesLocations = state.favoritesLocations.filter(
      (fav) => fav.Key !== location.Key,
    );
  },
  setCurrentLocation(state, locationData) {
    state.weatherLocations = locationData;
  },
  setCurrentWeather(state, currentWeather) {
    state.currentWeather = currentWeather[0];
  },
  setForecastWeather(state, forecastWeather) {
    state.forecastWeather = forecastWeather;
  },
  setError(state, { title, message }) {
    state.error.isVisible = true;
    state.error.title = title;
    state.error.message = message;
  },
  clearError(state) {
    state.error.isVisible = false;
    state.error.title = "Error";
    state.error.message = "";
  },
};

const actions = {
  async setLocationToFavorites({ commit }, location) {
    try {
      commit("setToFavorites", location);
    } catch (e) {
      commit("setError", {
        title: "Set Location To Favorites Error",
        message: "An error occurred while setting the location as a favorite.",
      });
    }
  },

  async searchLocation({ commit }, obj) {
    try {
      const locations = await getLocation(obj.queryString);
      const results = obj.queryString
        ? locations.filter((location) => {
            return (
              location.LocalizedName.toLowerCase().indexOf(
                obj.queryString.toLowerCase(),
              ) === 0
            );
          })
        : locations;
      const newResults = results.map((res) => {
        const newRes = {
          ...res,
          value: res.LocalizedName,
        };

        delete newRes.LocalizedName;
        return {
          ...newRes,
        };
      });
      obj.cb(newResults);
      commit("setCurrentLocation", newResults);
    } catch (error) {
      commit("setError", {
        title: "Location Search Error",
        message: "An error occurred while searching for locations.",
      });
    }
  },

  async getCurrentWeather({ commit }, keyLocation) {
    try {
      const currentWeather = await getCurrentWeather(keyLocation);
      commit("setCurrentWeather", currentWeather);
      return currentWeather;
    } catch (e) {
      commit("setError", {
        title: "Get Current Weather Error",
        message: "An error occurred while fetching current weather data.",
      });
    }
  },

  async getFiveDaysForecast({ commit }, keyLocation) {
    try {
      const forecast = await getFiveDaysWeather(keyLocation);
      commit("setForecastWeather", forecast);
    } catch (e) {
      commit("setError", {
        title: "Get Five Days Forecast Error",
        message: "An error occurred while fetching five days forecast data.",
      });
    }
  },

  async getLocationByKey({ commit }, keyLocation) {
    try {
      const location = await getLocationWeatherByKey(keyLocation);
      commit("setLocationByKey", location);
      return location;
    } catch (e) {
      commit("setError", {
        title: "Get Location by Key Error",
        message: "An error occurred while fetching location by key.",
      });
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
