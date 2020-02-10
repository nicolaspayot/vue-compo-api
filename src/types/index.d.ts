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

export interface SearchState {
  query: string;
  loading: boolean;
  repositories: RawRepository[];
}

export interface RawResult {
  items: RawRepository[];
}
