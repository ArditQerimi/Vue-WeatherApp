<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1>hello world</h1>
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped></style>
