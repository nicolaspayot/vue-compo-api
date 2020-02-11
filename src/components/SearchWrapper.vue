<template>
  <main class="search">
    <SearchInput v-model="searchState.query" @enter="submitSearch" />

    <SearchOrder
      v-model="orderByProp"
      v-if="!searchState.loading && searchState.repositories.length > 1"
    />

    <SearchLoader v-if="searchState.loading" />

    <section class="search__results" v-else>
      <SearchResult
        v-for="repository of orderedRepositories"
        :key="repository.id"
        :repository="repository"
      />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash/orderBy";
import githubAPI from "../api/";
import { RawRepository, RawResult, SearchState } from "../types";
import { AxiosResponse } from "axios";
import SearchInput from "./SearchInput.vue";
import SearchOrder from "./SearchOrder.vue";
import SearchLoader from "./SearchLoader.vue";
import SearchResult from "./SearchResult.vue";

export default Vue.extend({
  components: {
    SearchInput,
    SearchOrder,
    SearchLoader,
    SearchResult
  },

  data() {
    return {
      orderByProp: "score",
      searchState: {
        query: "",
        loading: false,
        repositories: []
      } as SearchState
    };
  },

  computed: {
    orderedRepositories(): RawRepository[] {
      return orderBy(this.searchState.repositories, this.orderByProp, "desc");
    }
  },

  methods: {
    search(): void {
      if (!this.searchState.query) {
        this.searchState.repositories = [];
        return;
      }

      this.searchState.loading = true;
      githubAPI
        .get(
          `/search/repositories?page=1&per_page=10&q=${this.searchState.query}`
        )
        .then((response: AxiosResponse<RawResult>) => {
          this.searchState.repositories = response.data.items;
        })
        .finally(() => {
          this.searchState.loading = false;
        });
    },

    submitSearch(): void {
      this.search();
    }
  },

  mounted(): void {
    this.searchState.query = "vue";
    this.search();
  }
});
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;

  &__results {
    margin-top: 50px;
    padding-bottom: 50px;
    width: 100%;
  }
}
</style>
