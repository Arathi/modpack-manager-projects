import { Client, formatCategory } from "@amcs/modrinth-api";

import type { Mod } from "@/domains/mod";
import type { ModFile } from "@/domains/mod-file";

import {
  ClientAdapter,
  type ModFilesConditions,
  type Pagination,
  type SearchConditions,
  type SearchResults,
} from "./client-adapter";
import type { Category } from "@/domains/category";

export class ModrinthAdapter extends ClientAdapter {
  client: Client;

  constructor() {
    super();
    const baseURL = `${location.origin}/api/modrinth`;
    this.client = new Client({
      baseURL,
    });
  }

  async getCategories(): Promise<Array<Category>> {
    const data = await this.client.getCategories();
    const categories = data
      .filter((it) => it.project_type === "mod")
      .map((it) => {
        return {
          id: it.name,
          slug: it.name,
          name: formatCategory(it.name),
          icon: it.icon,
          children: [],
        } satisfies Category;
      });
    return categories;
  }

  async search(
    conditions: SearchConditions,
    pagination: Pagination,
  ): Promise<SearchResults<Mod>> {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: pagination.pageSize,
        total: 0,
      },
    };
  }

  async getModFiles(
    modId: string,
    conditions: ModFilesConditions,
    pagination: Pagination,
  ): Promise<SearchResults<ModFile>> {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: pagination.pageSize,
        total: 0,
      },
    };
  }
}
