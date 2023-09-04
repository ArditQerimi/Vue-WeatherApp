<script>
import HelloWorld from "./components/HelloWorld.vue";
import NavbarView from "./views/NavbarView.vue";
import ErrorModal from "../src/components/ErrorHandlingDialog.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    "navbar-view": NavbarView,
    "error-modal": ErrorModal,
    HelloWorld,
  },

  computed: {
    ...mapState({
      error: (state) => state.weather.error,
    }),
  },

  methods: {
    ...mapMutations({
      clearError: "clearError",
    }),
  },

  watch: {
    error(value) {},
  },
  mounted() {},
};
</script>

<template>
  <navbar-view></navbar-view>
  <router-view></router-view>
  <error-modal
    :error-modal-visible="error.isVisible"
    :modal-title="error.title"
    :error-message="error.message"
    @close-modal="clearError"
  ></error-modal>
</template>

<style scoped></style>
