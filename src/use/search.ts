import { reactive, onMounted } from "@vue/composition-api";
import { SearchState } from "../types";

export default function useSearch<T>(query: string, getResults: (query: string) => Promise<T[]>) {
  const searchState = reactive<SearchState<T>>({
    query,
    loading: false,
    results: []
  });

  const runSearch = (): void => {
    if (!searchState.query) {
      searchState.results = [];
      return;
    }

    searchState.loading = true;
    getResults(searchState.query)
      .then((results: T[]) => {
        // @ts-ignore
        searchState.results = results;
      })
      .finally(() => {
        searchState.loading = false;
      });
  };

  onMounted(() => {
    runSearch();
  });

  return {
    searchState,
    runSearch
  };
}
