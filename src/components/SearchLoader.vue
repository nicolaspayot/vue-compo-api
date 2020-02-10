<template>
  <div class="search__loader">
    <span>Looking for repositories...</span>
    <FontAwesomeIcon icon="circle-notch" spin />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.search {
  &__loader {
    display: flex;
    align-items: center;
    margin-top: 100px;
    font-size: 25px;

    span {
      margin-right: 10px;
    }
  }
}
</style>
