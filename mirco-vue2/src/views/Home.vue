<template>
  <div class="home">
    <h1>Vue2 Micro Frontend Home</h1>
    <p>This is a Vue2 micro frontend application.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home'
});
</script>

<style scoped>
.home {
  padding: 20px;
}
</style> 