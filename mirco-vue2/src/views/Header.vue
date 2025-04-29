<template>
  <div class="header">
    <h1 @click="handleClick">{{ title || 'Header' }}</h1>
    <p>This is the about page of our Vue2 Header</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleClick() {
      this.onClick && this.onClick();
    }
  }
});
</script>

<style scoped>
.header {
  text-align: center;
  padding: 20px;
}
</style>
