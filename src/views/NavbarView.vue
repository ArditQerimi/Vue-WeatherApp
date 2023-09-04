<template>
  <div class="container">
    <div class="menu">
      <div>
        <ul>
          <li class="menu-item">
            <router-link
              to="/weather"
              class="menu-link"
              v-bind:class="{ 'active-menu-item': $route.path === '/weather' }"
              >Weather</router-link
            >
          </li>
          <li class="menu-item">
            <router-link
              to="/favorites"
              class="menu-link"
              v-bind:class="{
                'active-menu-item': $route.path === '/favorites',
              }"
              >Favorites</router-link
            >
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li class="menu-item user">
            <div
              style="display: flex; justify-content: space-between; gap: 10px"
            >
              <el-switch
                v-model="value1"
                @click="toggleTheme"
                :active-icon="Sunny"
                :inactive-icon="Moon"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              />
              <el-switch
                v-model="value2"
                @click="toggleTemperatureUnit"
                class="mt-2"
                :active-text="'°C'"
                :inactive-text="'°F'"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Check, Close, Moon, Sunny } from "@element-plus/icons-vue";
export default {
  name: "Navbar",
  components: {
    Check,
    Close,
  },
  data() {
    return {
      value1: true,
      value2: true,
    };
  },
  methods: {
    ...mapState({
      archivedStudents: (state) => state.students.archivedStudents,
    }),
    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
    toggleTheme() {},
    toggleTemperatureUnit() {},
  },
  computed: {
    Moon() {
      return Moon;
    },
    Sunny() {
      return Sunny;
    },

    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.menu {
  background-color: #fff;
  color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #545c64;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.menu-item {
  padding: 10px;
}

.menu-link {
  text-decoration: none;
  color: #545c64;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #67c23a;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.active-menu-item {
  color: #67c23a;
  font-weight: bold;
}
</style>
