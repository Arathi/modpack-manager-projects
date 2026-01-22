export type Facets = string[][];
export enum SortingMethod {
  Relevance = "relevance",
  Downloads = "downloads",
  Follows = "follows",
  Newest = "newest",
  Updated = "updated",
}

export interface SearchProjectsParameters {
  query?: string;
  facets?: string | Facets;
  index?: SortingMethod;
  offset?: number;
  limit?: number;
}
