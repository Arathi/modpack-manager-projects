import type { Category, GetCategoriesParameters } from "./schemas/category";
import type { Mod, SearchParameters } from "./schemas/mod";
import type { GetModFilesParameters, ModFile } from "./schemas/mod-file";
import type {
  DataResponse,
  ListResponse,
  PaginatedResponse,
} from "./schemas/response";

export const DEFAULT_BASE_URL = "https://api.curseforge.com";
export const GAME_ID_MINECRAFT = 432;
export const CLASS_ID_MODS = 6;
export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 50;

export interface ClientOptions {
  baseURL?: string;
  apiKey?: string;
}

export interface SendOptions {
  method?: string;
}

export abstract class Client {
  baseURL: string;
  apiKey?: string;

  constructor(options: ClientOptions) {
    const { baseURL = DEFAULT_BASE_URL, apiKey } = options;
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async getCategories(
    params: GetCategoriesParameters = {},
  ): Promise<ListResponse<Category>> {
    const uri = "/v1/categories";
    const { gameId = GAME_ID_MINECRAFT, classId, classesOnly } = params;
    return this.get(uri, {
      gameId,
      classId,
      classesOnly,
    });
  }

  async search(params: SearchParameters = {}): Promise<PaginatedResponse<Mod>> {
    const uri = "/v1/mods/search";
    let {
      gameId = GAME_ID_MINECRAFT,
      classId = CLASS_ID_MODS,
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
      index = DEFAULT_PAGE_INDEX,
      pageSize = DEFAULT_PAGE_SIZE,
    } = params;

    if (categoryIds !== undefined) {
      categoryId = undefined;
    } else if (categoryId !== undefined) {
      categoryIds = undefined;
    }

    if (gameVersions !== undefined) {
      gameVersion = undefined;
    } else if (gameVersion !== undefined) {
      gameVersions = undefined;
    }

    if (modLoaderTypes !== undefined) {
      modLoaderType = undefined;
    } else if (modLoaderType !== undefined) {
      modLoaderTypes = undefined;
    }

    return this.get(uri, {
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
    });
  }

  async getMod(modId: number): Promise<DataResponse<Mod>> {
    const uri = `/v1/mods/${modId}`;
    return this.get(uri);
  }

  async getModFile(
    modId: number,
    fileId: number,
  ): Promise<DataResponse<ModFile>> {
    const uri = `/v1/mods/${modId}/files/${fileId}`;
    return this.get(uri);
  }

  async getModFiles(
    modId: number,
    params: GetModFilesParameters,
  ): Promise<PaginatedResponse<ModFile>> {
    const uri = `/v1/mods/${modId}/files`;
    const {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index = DEFAULT_PAGE_INDEX,
      pageSize = DEFAULT_PAGE_SIZE,
    } = params;
    return this.get(uri, {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private get<T>(uri: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${uri}`);
    for (const key in params) {
      const value = params[key];
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }
    return this.send(url);
  }

  protected abstract send<T>(url: URL): Promise<T>;
}
