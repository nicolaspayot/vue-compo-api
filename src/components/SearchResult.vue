<template>
  <div class="search__repository">
    <div class="repository__header">
      <div>
        <h1 class="repository__name">
          {{ repository.name }}
        </h1>
        <h2>{{ repository.full_name }}</h2>
      </div>
      <span>🌡️ {{ repository.score }}</span>
    </div>
    <p class="repository__description" v-html="repository.description"></p>
    <div>⭐ {{ repository.stargazers_count }}</div>
    <div>⚠️ {{ repository.open_issues_count }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RawRepository } from "../types";

export default Vue.extend({
  props: {
    repository: {
      type: Object as () => RawRepository,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__repository {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    padding: 20px;
    border-radius: 10px;
    transition: all 0.1s;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 25px 55px rgba(0, 0, 0, 0.2),
        0 16px 28px rgba(0, 0, 0, 0.24);
    }
  }

  .repository {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;

      h1,
      h2 {
        font-weight: 500;
      }
    }

    &__name {
      font-size: 32px;
    }

    &__description {
      margin-bottom: 10px;
    }
  }
}
</style>
