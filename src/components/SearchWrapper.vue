<template>
  <main class="search">
    <SearchInput v-model="searchState.query" @enter="runSearch" />

    <SearchOrder
      v-if="!searchState.loading && searchState.results.length > 1"
      v-model="orderIndex"
      :options="orderOptions"
    />

    <SearchLoader v-if="searchState.loading">
      Looking for repositories...
    </SearchLoader>

    <section class="search__results" v-else>
      <SearchResult v-for="result of orderedResults" :key="result.id" :repository="result" />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash/orderBy";
import githubAPI from "../api/";
import { RawRepository, RawResult, SearchState, OrderOption } from "../types";
import { AxiosResponse } from "axios";
import SearchInput from "./SearchInput.vue";
import SearchOrder from "./SearchOrder.vue";
import SearchLoader from "./SearchLoader.vue";
import SearchResult from "./SearchResult.vue";

const itemsWithScore = (items: RawRepository[]) => {
  return items.map((item, index) => ({ ...item, score: items.length - index }));
};

export default Vue.extend({
  components: {
    SearchInput,
    SearchOrder,
    SearchLoader,
    SearchResult
  },

  data() {
    return {
      searchState: {
        query: "vue",
        loading: false,
        results: []
      } as SearchState<RawRepository>,
      orderOptions: [
        { label: "🌡️ score", value: "score" },
        { label: "⭐ stargazers", value: "stargazers_count" },
        { label: "⚠️ issues", value: "open_issues_count" }
      ] as OrderOption[],
      orderIndex: 0
    };
  },

  computed: {
    orderedResults(): RawRepository[] {
      return orderBy(this.searchState.results, this.orderOptions[this.orderIndex].value, "desc");
    }
  },

  methods: {
    runSearch(): void {
      if (!this.searchState.query) {
        this.searchState.results = [];
        return;
      }

      this.searchState.loading = true;
      githubAPI
        .get(`/search/repositories?page=1&per_page=10&q=${this.searchState.query}`)
        .then((response: AxiosResponse<RawResult<RawRepository>>) => {
          this.searchState.results = itemsWithScore(response.data.items);
        })
        .finally(() => {
          this.searchState.loading = false;
        });
    }
  },

  mounted(): void {
    this.runSearch();
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
