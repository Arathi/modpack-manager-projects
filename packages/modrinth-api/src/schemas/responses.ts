import type { Project } from "./project";

export interface SearchProjectsResponse {
  hits: Array<Project>;
  offset: number;
  limit: number;
  total_hits: number;
}
