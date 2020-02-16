<template>
  <div class="search__order">
    <label>Order by</label>
    <div class="search__select">
      <select :value="value" @input="onInput($event.target.value)">
        <option v-for="(option, index) of options" :key="index" :value="index">{{ option.label }}</option>
      </select>
      <FontAwesomeIcon icon="angle-down" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { OrderOption } from "../types";

export default Vue.extend({
  props: {
    options: {
      type: Array as () => OrderOption[],
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },

  methods: {
    onInput(index: number): void {
      this.$emit("input", index);
    }
  }
});
</script>

<style lang="scss" scoped>
.search {
  &__order {
    display: flex;
    align-self: flex-start;
    align-items: center;
    font-size: 18px;
    padding-left: 25px;
    margin-top: 15px;
  }

  &__select {
    display: flex;
    align-items: center;
    padding-right: 10px;
    margin-left: 10px;
    font-size: 18px;
    border: 2px solid #fff;
    width: 180px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;

    select {
      padding: 5px 8px;
      color: #fff;
      font-size: 18px;
      width: 100%;
      border: none;
      box-shadow: none;
      background: transparent;
      background-image: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
