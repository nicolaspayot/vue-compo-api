<template>
  <div class="search__input-wrapper">
    <input
      class="search__input"
      type="text"
      :value="value"
      @input="onInput($event.target.value)"
      @keyup.enter="onEnter"
    />
    <FontAwesomeIcon class="search__icon" icon="search" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    onInput(value: string): void {
      this.$emit("input", value);
    },

    onEnter(): void {
      this.$emit("enter", this.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__input-wrapper {
    position: relative;
    width: 100%;
  }

  &__input {
    width: 100%;
    background: transparent;
    color: #fff;
    padding: 10px 50px 10px 20px;
    font-size: 25px;
    border: 5px solid #fff;
    border-radius: 30px;
    outline: none;
  }

  &__icon {
    position: absolute;
    font-size: 28px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
