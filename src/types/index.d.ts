export interface RawRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  open_issues_count: number;
  score: number;
}

export interface SearchState<T> {
  query: string;
  loading: boolean;
  results: T[];
}

export interface RawResult<T> {
  items: T[];
}

export interface OrderOption {
  label: string;
  value: string;
}
