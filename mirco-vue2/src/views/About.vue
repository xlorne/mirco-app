<template>
  <div class="about">
    <h1>About Vue2 Micro Frontend</h1>
    <p>This is the about page of our Vue2 micro frontend application.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'About'
});
</script>

<style scoped>
.about {
  padding: 20px;
}
</style> 