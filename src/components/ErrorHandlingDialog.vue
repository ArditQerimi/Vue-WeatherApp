<template>
  <el-dialog
    v-model="isVisible"
    :title="modalTitle"
    @close="handleCloseModal"
    align-center
    class="red-modal"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ modalTitle }}</h4>
        <div
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </div>
      </div>
    </template>
    <p
      style="
        background-color: #fff;
        min-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: larger;
      "
    >
      {{ errorMessage }}
    </p>
  </el-dialog>
</template>

<script>
import { ref, watchEffect } from "vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";

export default {
  components: { CircleCloseFilled },
  props: {
    errorModalVisible: Boolean,
    modalTitle: String,
    errorMessage: String,
  },
  setup(props) {
    const isVisible = ref(props.errorModalVisible);

    watchEffect(() => {
      isVisible.value = props.errorModalVisible;
    });

    return {
      isVisible,
    };
  },
  methods: {
    handleCloseModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style>
.red-modal {
  background-color: #ffdddd;
  color: #ff0000;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
</style>
