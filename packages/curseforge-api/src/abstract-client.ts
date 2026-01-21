import type { Category } from "./schemas/category";
import type { Mod } from "./schemas/mod";
import type { ModFile } from "./schemas/mod-file";
import { ModLoaderType } from "./schemas/mod-loader-type";
import type {
  GetCategoriesParameters,
  GetModFilesParameters,
  SearchModsParameters,
} from "./schemas/requests";
import type { ListResponse, PaginationResponse } from "./schemas/responses";

export const DEFAULT_BASE_URL = "https://api.curseforge.com";
export const GAME_ID_MINECRAFT = 432;
export const CLASS_ID_MODS = 6;

type ParameterValue = string | number | boolean | undefined;
type Parameters = Record<string, ParameterValue>;

export interface Options {
  baseURL?: string;
  apiKey?: string;
}

export abstract class AbstractClient {
  baseURL: string;
  apiKey?: string;

  constructor({ baseURL = DEFAULT_BASE_URL, apiKey }: Options) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  getCategories({
    gameId,
    classId,
    classesOnly,
  }: GetCategoriesParameters): Promise<ListResponse<Category>> {
    const uri = "/v1/categories";
    return this.get(uri, {
      gameId,
      classId,
      classesOnly,
    });
  }

  searchMods({
    gameId,
    classId,
    categoryId,
    categoryIds,
    gameVersion,
    gameVersions,
    searchFilter,
    sortField,
    sortOrder,
    modLoaderType,
    modLoaderTypes,
    gameVersionTypeId,
    authorId,
    primaryAuthorId,
    slug,
    index,
    pageSize,
  }: SearchModsParameters): Promise<PaginationResponse<Mod>> {
    const uri = "/v1/mods/search";
    const params: Parameters = {
      gameId,
      classId,
      categoryId,
      gameVersion,
      searchFilter,
      sortField,
      sortOrder,
      modLoaderType,
      gameVersionTypeId,
      authorId,
      primaryAuthorId,
      slug,
      index,
      pageSize,
    };

    if (categoryIds !== undefined) {
      if (typeof categoryIds === "string") {
        params.categoryIds = categoryIds;
      } else {
        params.categoryIds = `[${categoryIds.join(",")}]`;
      }
    }

    if (gameVersions !== undefined) {
      if (typeof gameVersions === "string") {
        params.gameVersions = gameVersions;
      } else {
        const list = gameVersions.map((it) => `"${it}"`);
        params.gameVersions = `[${list.join(",")}]`;
      }
    }

    if (modLoaderTypes !== undefined) {
      if (typeof modLoaderTypes === "string") {
        params.modLoaderTypes = modLoaderTypes;
      } else {
        const list = modLoaderTypes.map((it) => `${ModLoaderType[it]}`);
        params.modLoaderTypes = `[${list.join(",")}]`;
      }
    }

    return this.get(uri, params);
  }

  getModFiles(
    modId: number,
    {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    }: GetModFilesParameters,
  ): Promise<PaginationResponse<ModFile>> {
    const uri = `/v1/mods/${modId}/files`;
    return this.get(uri, {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    });
  }

  get<R>(uri: string, params: Parameters): Promise<R> {
    const url = new URL(`${this.baseURL}${uri}`);
    for (const key in params) {
      const value = params[key];
      if (typeof value !== "undefined") {
        url.searchParams.set(key, `${value}`);
      }
    }
    return this.getByURL<R>(url);
  }

  getByURL<R>(url: URL): Promise<R> {
    return this.send<R>("GET", url);
  }

  abstract send<R>(method: string, url: URL): Promise<R>;
}
