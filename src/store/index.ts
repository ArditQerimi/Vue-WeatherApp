import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import weather from "@/views/WeatherView/weather";

export default createStore({
  modules: {
    weather,
  },
  plugins: [
    createPersistedState({
      key: "my-app",
      paths: ["auth.user"],
    }),
  ],
});
