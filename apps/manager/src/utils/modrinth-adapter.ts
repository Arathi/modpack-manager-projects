import { Client, formatCategory } from "@amcs/modrinth-api";

import type { Category } from "@/domains/category";
import type { Mod } from "@/domains/mod";
import type { ModFile } from "@/domains/mod-file";

import {
  ClientAdapter,
  type ModFilesConditions,
  type Pagination,
  type SearchConditions,
  type SearchResults,
} from "./client-adapter";
import { Environment } from "@/domains/environment";
import { Source } from "@/domains/source";

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
    const sortingMethod = undefined;

    const facets = [["project_type:mod"]];

    const categories: string[][] = conditions.categories.map((slug) => [
      `categories:${slug}`,
    ]);
    if (categories.length > 0) {
      facets.push(...categories);
    }

    const versions: string[] = conditions.versions.map((v) => `versions:${v}`);
    if (versions.length > 0) {
      facets.push(versions);
    }

    const loaders: string[] = conditions.loaders.map((l) => `categories:${l}`);
    if (loaders.length > 0) {
      facets.push(loaders);
    }

    for (const env of conditions.environments) {
      switch (env) {
        case Environment.Server:
          facets.push(["server_side:required"]);
          break;
        case Environment.Client:
          facets.push(["client_side:required"]);
          break;
      }
    }

    console.info(`facets = `, JSON.stringify(facets));

    const res = await this.client.searchProjects({
      query: conditions.keyword,
      facets,
      index: sortingMethod,
      offset: (pagination.current - 1) * pagination.pageSize,
      limit: pagination.pageSize,
    });
    console.info("Modrinth搜索结果如下：", res);

    const mods = res.hits.map((it) => {
      return {
        source: Source.Modrinth,
        id: it.project_id,
        name: it.title,
        author: {
          id: it.author,
          name: it.author,
          url: "",
        },
        logo: it.icon_url,
        description: it.description,
      } satisfies Mod;
    });

    return {
      data: mods,
      pagination: {
        current: Math.ceil((res.offset + 1) / res.limit),
        pageSize: pagination.pageSize,
        total: res.total_hits,
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
