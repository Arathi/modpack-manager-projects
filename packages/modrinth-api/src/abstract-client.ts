import { Category } from "./schemas/category";
import { SearchProjectsResponse } from "./schemas/responses";

export const DEFAULT_BASE_URL = "https://api.modrinth.com/v2";

type ParameterValue = string | number | boolean | undefined;
type Parameters = Record<string, ParameterValue>;

export interface Options {
  baseURL?: string;
}

export abstract class AbstractClient {
  baseURL: string;

  constructor({ baseURL = DEFAULT_BASE_URL }: Options) {
    this.baseURL = baseURL;
  }

  getCategories(): Promise<Category[]> {
    const uri = "/tag/category";
    return this.get(uri);
  }

  searchProjects(
    query: string,
    facets: string,
    index: string,
    offset: number,
    limit: number,
  ): Promise<SearchProjectsResponse> {
    const uri = "";
    const params = {};
    return this.get(uri, params);
  }

  projectVersions(idSlug: string) {
    const uri = `/project/${idSlug}/version`;
    const params = {};
    return this.get(uri, params);
  }

  async get<T>(uri: string, params: Parameters = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${uri}`);
    for (const key in params) {
      const value = params[key];
      if (value !== undefined) {
        url.searchParams.set(key, `${value}`);
      }
    }
    return this.send("GET", url);
  }

  abstract send<T>(method: string, url: URL): Promise<T>;
}
