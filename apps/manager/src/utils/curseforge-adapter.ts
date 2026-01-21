import {
  CLASS_ID_MODS,
  Client,
  GAME_ID_MINECRAFT,
  HashAlgorithm,
  ModLoaderType,
  RelationType,
  SortField,
} from "@amcs/curseforge-api";

import type { Category } from "@/domains/category";
import { Loader } from "@/domains/loader";
import type { Mod } from "@/domains/mod";
import { DependencyType, type ModFile } from "@/domains/mod-file";
import { SortRule } from "@/domains/sort-rule";
import { Source } from "@/domains/source";

import type {
  ModFilesConditions,
  Pagination,
  SearchConditions,
  SearchResults,
} from "./client-adapter";
import { ClientAdapter } from "./client-adapter";

export class CurseForgeAdapter extends ClientAdapter {
  gameId: number;
  classId: number;
  client: Client;

  constructor() {
    super();
    this.gameId = GAME_ID_MINECRAFT;
    this.classId = CLASS_ID_MODS;

    const baseURL = `${location.origin}/api/curseforge`;
    const apiKey = localStorage.getItem("CURSE_FORGE_API_KEY") ?? "";
    this.client = new Client({
      baseURL,
      apiKey,
    });
  }

  private toModLoaderType(loader: Loader): ModLoaderType | null {
    switch (loader) {
      case Loader.Forge:
        return ModLoaderType.Forge;
      case Loader.Fabric:
        return ModLoaderType.Fabric;
      case Loader.Quilt:
        return ModLoaderType.Quilt;
      case Loader.NeoForge:
        return ModLoaderType.NeoForge;
    }
    return null;
  }

  private toSortField(sortRule: SortRule): SortField | undefined {
    switch (sortRule) {
      case SortRule.Relevance:
        return SortField.Popularity;
      case SortRule.Downloads:
        return SortField.TotalDownloads;
      case SortRule.DatePublished:
        return SortField.ReleasedDate;
      case SortRule.DateUpdated:
        return SortField.LastUpdated;
    }
    return undefined;
  }

  async getCategories(): Promise<Array<Category>> {
    const dict: Record<number, Category> = {};
    const { data } = await this.client.getCategories({
      gameId: this.gameId,
      classId: this.classId,
    });

    data.forEach((it) => {
      dict[it.id] = {
        id: `${it.id}`,
        slug: it.slug,
        name: it.name,
        icon: it.iconUrl,
        children: [],
      } satisfies Category;
    });

    data.forEach((it) => {
      const cat = dict[it.id];
      if (it.parentCategoryId !== undefined) {
        const parent = dict[it.parentCategoryId];
        if (parent !== undefined) {
          parent.children.push(cat);
        }
      }
    });

    const categories: Array<Category> = [];
    data.forEach((it) => {
      if (it.parentCategoryId === this.classId) {
        const cat = dict[it.id];
        categories.push(cat);
      }
    });
    return categories;
  }

  async search(
    conditions: SearchConditions,
    pagination: Pagination,
  ): Promise<SearchResults<Mod>> {
    const categoryIds: number[] = [];
    const gameVersions: string[] = conditions.versions;
    const modLoaderTypes: ModLoaderType[] = conditions.loaders
      .map((it) => this.toModLoaderType(it))
      .filter((it) => it !== null);
    const sortField = this.toSortField(conditions.sortRule);

    const res = await this.client.searchMods({
      gameId: this.gameId,
      classId: this.classId,
      categoryIds,
      gameVersions,
      searchFilter: conditions.keyword,
      sortField,
      sortOrder: "desc",
      modLoaderTypes,
      index: (pagination.current - 1) * pagination.pageSize,
      pageSize: pagination.pageSize,
    });

    const { index, pageSize, totalCount } = res.pagination;
    const current = Math.ceil((index + 1) / pageSize);
    const total = Math.min(totalCount, 10000);

    const mods = res.data.map((it) => {
      const author = it.authors[0];
      return {
        source: Source.CurseForge,
        id: `${it.id}`,
        name: it.name,
        author: {
          id: `${author.id}`,
          name: author.name,
          url: author.url,
        },
        logo: it.logo.url,
        description: it.summary,
      } satisfies Mod;
    });

    return {
      data: mods,
      pagination: {
        current,
        pageSize,
        total,
      },
    } satisfies SearchResults<Mod>;
  }

  async getModFiles(
    modId: string,
    conditions: ModFilesConditions,
    pagination: Pagination,
  ): Promise<SearchResults<ModFile>> {
    const modIdNumeric = Number.parseInt(modId, 10);
    if (Number.isNaN(modIdNumeric)) {
      throw new Error();
    }

    const modLoaderType = this.toModLoaderType(conditions.loader);
    if (modLoaderType === null) {
      throw new Error();
    }

    const res = await this.client.getModFiles(modIdNumeric, {
      gameVersion: conditions.version,
      modLoaderType,
      index: (pagination.current - 1) * pagination.pageSize,
      pageSize: pagination.pageSize,
    });

    const { index, pageSize, totalCount } = res.pagination;
    const current = Math.ceil((index + 1) / pageSize);
    const total = Math.min(totalCount, 10000);

    const files = res.data.map((it) => {
      const hashes: Record<string, string> = {};
      const sha1 = it.hashes.find((h) => h.algo === HashAlgorithm.SHA1);
      if (sha1 !== undefined) {
        hashes.sha1 = sha1.value;
      }
      const md5 = it.hashes.find((h) => h.algo === HashAlgorithm.MD5);
      if (md5 !== undefined) {
        hashes.md5 = md5.value;
      }

      const dependencies = it.dependencies.map((dep) => {
        const modId = `${dep.modId}`;
        const type =
          dep.relationType === RelationType.RequiredDependency
            ? DependencyType.Required
            : DependencyType.Optional;
        return {
          modId,
          fileId: undefined,
          type,
        };
      });

      return {
        source: Source.CurseForge,
        id: `${it.id}`,
        name: it.displayName,
        hashes,
        releaseDate: 0,
        length: it.fileLength,
        url: it.downloadUrl,
        dependencies,
      } satisfies ModFile;
    });

    return {
      data: files,
      pagination: {
        current,
        pageSize,
        total,
      },
    } satisfies SearchResults<ModFile>;
  }
}
