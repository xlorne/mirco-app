<template>
    <div class="header">
      <h1>Header</h1>
      <p>This is the about page of our Vue2 Header</p>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  
  export default Vue.extend({
    name: 'Header'
  });
  </script>
  
  <style scoped>
  .header {
    padding: 20px;
  }
  </style> 