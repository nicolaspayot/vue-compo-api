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
import { createComponent, computed } from "@vue/composition-api";
import githubAPI from "../api/";
import { RawRepository, RawResult } from "../types";
import { AxiosResponse } from "axios";
import SearchInput from "./SearchInput.vue";
import SearchOrder from "./SearchOrder.vue";
import SearchLoader from "./SearchLoader.vue";
import SearchResult from "./SearchResult.vue";
import useSearch from "../use/search";
import useOrder from "../use/order";

const itemsWithScore = (items: RawRepository[]) => {
  return items.map((item, index) => ({ ...item, score: items.length - index }));
};

export default createComponent({
  components: {
    SearchInput,
    SearchOrder,
    SearchLoader,
    SearchResult
  },

  setup() {
    // search feature
    const getRepositories = (query: string) =>
      githubAPI
        .get(`/search/repositories?page=1&per_page=10&q=${query}`)
        .then((response: AxiosResponse<RawResult<RawRepository>>) => itemsWithScore(response.data.items));

    const { searchState, runSearch } = useSearch("vue", getRepositories);

    // order feature
    const { orderOptions, orderIndex, orderedResults } = useOrder<RawRepository>(
      computed(() => searchState.results),
      [
        { label: "🌡️ score", value: "score" },
        { label: "⭐ stargazers", value: "stargazers_count" },
        { label: "⚠️ issues", value: "open_issues_count" }
      ],
      0
    );

    return {
      searchState,
      runSearch,
      orderOptions,
      orderIndex,
      orderedResults
    };
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
