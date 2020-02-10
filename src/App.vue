<template>
  <SearchWrapper />
</template>

<script lang="ts">
import Vue from "vue";

import SearchWrapper from "./components/SearchWrapper.vue";

export default Vue.extend({
  components: {
    SearchWrapper
  }
});
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
p,
h1,
h2 {
  margin: 0;
  padding: 0;
  font-weight: inherit;
  font-size: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #eb4d6d;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  margin-top: 60px;
}
</style>
