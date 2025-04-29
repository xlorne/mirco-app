<template>
    <div class="header">
      <h1 @click="handleClick">{{ title || 'Header' }}</h1>
      <p>This is the about page of our Vue3 Header</p>
    </div>
  </template>

  <script setup lang="ts">
  import { defineProps } from 'vue';
  const props = defineProps<{
    title?: string;
    onClick?: () => void;
  }>();

  function handleClick() {
    props.onClick?.(); // 如果存在 onClick，调用它
  }
  </script>

  <style scoped>
  .header {
    text-align: center;
    padding: 20px;
  }
  </style>
