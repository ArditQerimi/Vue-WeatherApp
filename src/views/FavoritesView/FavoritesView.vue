<template>
  <div style="display: flex; justify-content: center">
    <div class="favorites-container">
      <h1 style="text-align: center">Favorites</h1>
      <el-menu style="background-color: #ebeef5" mode="vertical">
        <el-menu-item
          v-for="favorite in favoritesLocations"
          :key="favorite.Key"
          class="custom-menu-item"
        >
          <el-row style="width: 100%" justify="space-between">
            <el-col style="width: 50%" span="18">
              <router-link
                :to="'/weather/' + favorite.Key"
                class="custom-router-link"
              >
                {{ favorite.Key }} /
                {{ favorite.AdministrativeArea?.LocalizedName }} -
                {{ favorite.currentTemperature }}°C
              </router-link>
            </el-col>
            <el-col style="display: flex; align-items: center" span="6">
              <div style="margin-right: -15px">
                <router-link
                  :to="'/weather/' + favorite.Key"
                  class="custom-open-button custom-router-link"
                >
                  Open
                </router-link>
              </div>

              <el-button
                type="danger"
                @click="removeFromFavorites(favorite)"
                class="custom-button"
              >
                Remove
              </el-button>
            </el-col>
          </el-row>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      favoritesLocations: (state) => state.weather?.favoritesLocations,
    }),
  },
  methods: {
    ...mapMutations({
      removeFromFavorites: "removeFromFavorites",
    }),
  },
  watch: {
    favoritesLocations(value) {},
  },

  mounted() {},
};
</script>

<style scoped>
.custom-menu-item {
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .custom-menu-item {
    padding: 0px;
    overflow-x: auto;
  }
}

.custom-router-link {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  margin-right: 20px;
}

.custom-open-button {
  background-color: #67c23a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 8px 16px;
  font-weight: 400;
}

.custom-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #cc0000;
}

.favorites-container {
  width: 500px;
  border: 1px solid #f8f8f8;
  background-color: #f8f8f8;
}
</style>
