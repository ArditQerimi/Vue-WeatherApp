<template>
  <el-container direction="vertical">
    <el-row
      class="demo-autocomplete"
      justify="center"
      gutter="20"
      style="
        display: flex !important;
        flex-direction: column !important;
        align-items: center;
        gap: 10px;
      "
    >
      <div class="sub-title my-2 text-sm text-gray-600">Search Weather</div>

      <el-autocomplete
        v-model="searchString"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </el-row>
    <el-row justify="center" v-if="Object.keys(selectedLocation).length > 0">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span
              >{{ selectedLocation?.AdministrativeArea?.LocalizedName }} /
              {{ selectedLocation?.Country?.LocalizedName }}</span
            >
            <el-button
              class="button"
              type="success"
              text
              @click="setLocationToFavorites(selectedLocation)"
              >Add to favorites</el-button
            >
          </div>
        </template>
        <el-row justify="space-between">
          <el-col span="12">
            <p class="text-lg-h2">
              {{ currentWeather.Temperature?.Metric?.Value }}°C
            </p>
          </el-col>
          <el-col span="12">
            <div>
              <div v-if="currentWeather.WeatherIcon < 10">
                <img
                  class="weather-icon"
                  alt="weather-icon"
                  :src="`https://developer.accuweather.com/sites/default/files/0${currentWeather.WeatherIcon}-s.png`"
                />
              </div>
              <div v-else>
                <img
                  class="weather-icon"
                  alt="weather-icon"
                  :src="`https://developer.accuweather.com/sites/default/files/${currentWeather.WeatherIcon}-s.png`"
                />
              </div>
              <p class="weather-text">{{ currentWeather.WeatherText }}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row
      justify="center"
      style="margin-top: 10px"
      v-if="Object.keys(selectedLocation).length > 0"
    >
      <el-card class="box-card-forecast">
        <template #header>
          <div class="card-header">
            <span>Five-Day Weather Forecast</span>
          </div>
        </template>
        <el-container direction="horizontal">
          <div
            v-for="forecast in forecastWeather?.DailyForecasts"
            :key="forecast.Date"
          >
            <div class="forecast-card">
              <p class="forecast-day_week">{{ getDayWeek(forecast.Date) }}</p>
              <p class="temperature-max">
                {{ fahrenheitToCelsius(forecast.Temperature.Maximum.Value) }}°C
              </p>
              <p class="temperature-min">
                {{ fahrenheitToCelsius(forecast.Temperature.Minimum.Value) }}°C
              </p>

              <div>
                <div v-if="forecast.Day.Icon < 10">
                  <img
                    class="weather-icon"
                    alt="weather-icon"
                    :src="`https://developer.accuweather.com/sites/default/files/0${forecast.Day.Icon}-s.png`"
                  />
                </div>
                <div v-else>
                  <img
                    class="weather-icon"
                    alt="weather-icon"
                    :src="`https://developer.accuweather.com/sites/default/files/${forecast.Day.Icon}-s.png`"
                  />
                </div>
                <p class="weather-text">{{ forecast.Day.IconPhrase }}</p>
              </div>
            </div>
          </div>
        </el-container>
      </el-card>
    </el-row>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      searchString: "",
      currentCondition: {},
      fiveDaysWeatherForecast: {},
      selectedLocation: {},
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  async created() {
    const route = this.$route;
    let key;

    if (route.fullPath === "/weather") {
      key = "298740";
    } else {
      key = this.$route.params.key;
    }

    const { location, currentWeather } = await this.fetchLocationAndWeather(
      key,
    );

    this.selectedLocation = {
      ...location,
      currentTemperature: currentWeather[0]?.Temperature?.Metric?.Value,
    };

    this.searchString = location?.AdministrativeArea?.LocalizedName;
  },
  computed: {
    ...mapState({
      weatherLocations: (state) => state.weather.weatherLocations,
      currentWeather: (state) => state.weather.currentWeather,
      forecastWeather: (state) => state.weather.forecastWeather,
      locationByKey: (state) => state.weather.locationByKey,
    }),
  },
  methods: {
    ...mapActions({
      setLocationToFavorites: "setLocationToFavorites",
    }),
    async fetchLocationAndWeather(key) {
      const location = await this.$store.dispatch("getLocationByKey", key);
      const currentWeather = await this.$store.dispatch(
        "getCurrentWeather",
        key,
      );

      return { location, currentWeather };
    },
    async querySearch(queryString, cb) {
      const obj = {
        queryString,
        cb,
      };
      await this.$store.dispatch("searchLocation", obj);
    },
    async handleSelect(item) {
      const { location, currentWeather } = await this.fetchLocationAndWeather(
        item.Key,
      );
      this.selectedLocation = {
        ...location,
        currentTemperature: currentWeather[0]?.Temperature?.Metric?.Value,
      };
    },
    getDayWeek(date) {
      const dayIndex = new Date(date).getDay();
      return this.daysOfWeek[dayIndex];
    },
    fahrenheitToCelsius(fahrenheit) {
      return (((fahrenheit - 32) * 5) / 9).toFixed(1);
    },
  },

  watch: {
    selectedLocation: {
      immediate: true,
      async handler(location) {
        if (this.selectedLocation.hasOwnProperty("Key")) {
          await this.$store.dispatch(
            "getCurrentWeather",
            this.selectedLocation.Key,
          );
          await this.$store.dispatch(
            "getFiveDaysForecast",
            this.selectedLocation.Key,
          );
        }
      },
    },
  },
  mounted() {},
};
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.box-card-forecast {
  overflow: auto;
}
.text-lg-h2 {
  font-size: 3.75rem !important;
  font-weight: 300;
  line-height: 0.75rem;
  letter-spacing: -0.0083333333em !important;
  font-family: Roboto, sans-serif !important;
  text-transform: none !important;
}

.forecast-day_week {
  font-size: 20px;
  text-align: center;
}
.weather-text {
  text-align: center;
}

.weather-icon {
  width: 125px;
  object-fit: contain;
}

.temperature-max {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff9700;
  text-align: center;
}
.temperature-min {
  font-size: 14px;
  color: #333;
  text-align: center;
}
</style>
