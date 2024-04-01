import axios, { AxiosInstance, AxiosHeaders } from 'axios';
import type {
  GetModFilesParams,
  GetModFilesRequestBody,
  GetModsByIdsListRequestBody,
  SearchModsParameters,
} from './schema/requests';
import type {
  DataResponse,
  ListResponse,
  PaginationResponse,
  GameVersionsByType,
  GameVersionType,
  MinecraftGameVersion,
  MinecraftModLoaderIndex,
  MinecraftModLoaderVersion,
} from './schema/responses';
import type Game from './schema/game';
import type Category from './schema/category';
import type Mod from './schema/mod';
import type File from './schema/file';

export const BASE_URL = 'https://api.curseforge.com';
export const GAME_ID_MINECRAFT = 432;
export const CLASS_ID_MODS = 6;

type QueryParamValue = string | number | boolean | undefined;
type QueryParams = Record<string, QueryParamValue>;

class CurseForgeApi {
  /**
   * API地址
   */
  private baseURL: string;

  /**
   * API_KEY
   */
  private apiKey: string;

  /**
   * Axios
   */
  private axios: AxiosInstance;

  constructor({ baseURL = BASE_URL, apiKey = '' }) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.axios = axios.create({});
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // #region HTTP
  /**
   * 获取请求头
   */
  private get headers() {
    const headers = new AxiosHeaders();
    headers.set('x-api-key', this.apiKey);
    return headers;
  }

  /**
   * 发送GET请求
   * @param uri URI，不带baseURL
   * @param params Query参数
   * @returns 响应报文
   */
  private async get<R>(uri: string, params?: QueryParams): Promise<R> {
    const url = new URL(`${this.baseURL}${uri}`);
    if (params !== undefined) {
      const keys = Object.keys(params);
      keys.forEach(key => {
        const value = params[key];
        if (value !== undefined) {
          url.searchParams.append(key, `${value}`);
        }
      });
    }
    console.debug(`发起GET请求：${url}`);
    const resp = await this.axios.get<R>(url.toString(), {
      headers: this.headers,
    });
    if (resp.status !== 200) {
      throw new Error(`HTTP请求失败，返回状态码：${resp.status}`);
    }
    return resp.data;
  }

  /**
   * 发送POST请求
   * @param uri URI，不带baseURL
   * @param body 请求体
   * @returns 响应报文
   */
  private async post<R>(uri: string, body?: any): Promise<R> {
    const url = new URL(`${this.baseURL}${uri}`);
    console.debug(`发起POST请求：${url}，报文如下：`, body);
    const resp = await this.axios.post<R>(url.toString(), body, {
      headers: this.headers,
    });
    if (resp.status !== 200) {
      throw new Error(`HTTP请求失败，返回状态码：${resp.status}`);
    }
    return resp.data;
  }
  // #endregion

  // #region Games
  /**
   * 获取游戏信息
   * @param gameId 游戏ID（默认：432=Minecraft）
   * @returns 游戏信息
   */
  async getGame(gameId = GAME_ID_MINECRAFT) {
    const uri = `/v1/games/${gameId}`;
    return this.get<DataResponse<Game>>(uri);
  }

  /**
   * 获取版本列表
   * @param gameId 游戏ID（默认：432=Minecraft）
   * @returns 版本列表
   */
  async getVersions(gameId = GAME_ID_MINECRAFT) {
    const uri = `/v1/games/${gameId}/versions`;
    return this.get<ListResponse<GameVersionsByType>>(uri);
  }

  /**
   * 获取游戏版本类型列表
   * @param gameId 游戏ID（默认：432=Minecraft）
   * @returns 版本类型
   */
  async getVersionTypes(gameId = GAME_ID_MINECRAFT) {
    const uri = `/v1/games/${gameId}/version-types`;
    return this.get<ListResponse<GameVersionType>>(uri);
  }
  // #endregion

  // #region Categories
  /**
   * 获取分类
   * @param gameId 游戏ID（默认：432=Minecraft）
   * @param classId 主分类ID（默认：6=Mods）
   * @param classesOnly 只列出主分类
   * @returns 分类列表
   */
  async getCategories(
    gameId = GAME_ID_MINECRAFT,
    classId = CLASS_ID_MODS,
    classesOnly = false,
  ) {
    const uri = `/v1/categories`;
    return this.get<ListResponse<Category>>(uri, {
      gameId,
      classId,
      classesOnly,
    });
  }
  // #endregion

  // #region Mods
  /**
   * 根据条件搜索MOD
   * @param params 搜索条件
   * @returns 搜索结果（分页）
   */
  async searchMods({
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
    index,
    pageSize,
  }: SearchModsParameters) {
    const uri = `/v1/mods/search`;
    const params: QueryParams = {
      gameId,
    };

    if (classId !== undefined) {
      params.classId = classId;
    }

    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }

    if (categoryIds !== undefined) {
      params.categoryIds = categoryIds;
    }

    if (gameVersion !== undefined) {
      params.gameVersion = gameVersion;
    }

    if (gameVersions !== undefined) {
      params.gameVersions = gameVersions;
    }

    if (searchFilter !== undefined) {
      params.searchFilter = searchFilter;
    }

    if (sortField !== undefined) {
      params.sortField = sortField;
    }

    if (sortOrder !== undefined) {
      params.sortOrder = sortOrder;
    }

    if (modLoaderType !== undefined) {
      params.modLoaderType = modLoaderType;
    }

    if (modLoaderTypes !== undefined) {
      params.modLoaderTypes = modLoaderTypes;
    }

    if (gameVersionTypeId !== undefined) {
      params.gameVersionTypeId = gameVersionTypeId;
    }

    if (authorId !== undefined) {
      params.authorId = authorId;
    }

    if (primaryAuthorId !== undefined) {
      params.primaryAuthorId = primaryAuthorId;
    }

    if (slug !== undefined) {
      params.slug = slug;
    }

    if (index !== undefined) {
      params.index = index;
    }

    if (pageSize !== undefined) {
      params.pageSize = pageSize;
    }

    return this.get<PaginationResponse<Mod>>(uri, params);
  }

  /**
   * 获取指定编号的MOD
   * @param modId MOD编号
   * @returns MOD
   */
  async getMod(modId: number) {
    const uri = `/v1/mods/${modId}`;
    return this.get<DataResponse<Mod>>(uri);
  }

  /**
   * 获取MOD列表
   * @param body 编号列表
   * @returns MOD列表
   */
  async getMods(body: GetModsByIdsListRequestBody) {
    const uri = `/v1/mods`;
    return this.post<ListResponse<Mod>>(uri, body);
  }

  /**
   * 获取MOD描述信息
   * @param modId MOD编号
   * @param raw 原始数据
   * @param stripped ？
   * @param markup 标记
   */
  async getModDescription(
    modId: number,
    raw?: boolean,
    stripped?: boolean,
    markup?: boolean,
  ): Promise<DataResponse<string>> {
    const uri = `/v1/mods/${modId}/description`;
    return this.get<DataResponse<string>>(uri, {
      raw,
      stripped,
      markup,
    });
  }
  // #endregion

  // #region Files
  /**
   * 获取指定MOD文件
   * @param modId MOD编号
   * @param fileId 文件编号
   * @returns MOD文件
   */
  async getModFile(modId: number, fileId: number) {
    const uri = `/v1/mods/${modId}/files/${fileId}`;
    return this.get<DataResponse<File>>(uri);
  }

  /**
   * 获取指定MOD符合条件的文件
   * @returns MOD文件列表
   */
  async getModFiles({
    modId,
    gameVersion,
    modLoaderType,
    gameVersionTypeId,
    index,
    pageSize,
  }: GetModFilesParams) {
    const uri = `/v1/mods/${modId}/files`;
    return this.get<PaginationResponse<File>>(uri, {
      modId,
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    });
  }

  /**
   * 获取多个指定MOD文件
   * @returns MOD文件列表
   */
  async getFiles(body: GetModFilesRequestBody) {
    const uri = `/v1/mods/files`;
    return this.post<ListResponse<Mod>>(uri, body);
  }

  /**
   * 获取指定MOD文件的修改日志
   * @param modId MOD编号
   * @param fileId 文件编号
   * @returns 修改日志
   */
  async getModFileChangeLog(modId: number, fileId: number) {
    const uri = `/v1/mods/${modId}/files/${fileId}/changelog`;
    return this.get<DataResponse<string>>(uri);
  }

  /**
   * 获取指定MOD文件的下载地址
   * @param modId MOD编号
   * @param fileId 文件编号
   * @returns 下载地址
   */
  async getModFileDownloadURL(modId: number, fileId: number) {
    const uri = `/v1/mods/${modId}/files/${fileId}/download-url`;
    return this.get<DataResponse<string>>(uri);
  }
  // #endregion

  // #region Minecraft
  /**
   * 获取Minecraft版本列表
   * @param sortDescending 是否倒序排列
   * @returns Minecraft版本列表
   */
  async getMinecraftVersions(sortDescending?: boolean) {
    const uri = `/v1/minecraft/version`;
    return this.get<ListResponse<MinecraftGameVersion>>(uri, {
      sortDescending,
    });
  }

  /**
   * 获取指定Minecraft版本信息
   * @param gameVersionString 版本号
   * @returns Minecraft版本
   */
  async getSpecificMinecraftVersion(gameVersionString: string) {
    const uri = `/v1/minecraft/version/${gameVersionString}`;
    return this.get<DataResponse<MinecraftGameVersion>>(uri);
  }

  /**
   * 获取模组加载器索引表
   * @param version Minecraft版本
   * @param includeAll 包含所有
   * @returns 模组加载器索引表
   */
  async getMinecraftModLoaders(version?: string, includeAll?: boolean) {
    const uri = `/v1/minecraft/modloader`;
    return this.get<ListResponse<MinecraftModLoaderIndex>>(uri, {
      version,
      includeAll,
    });
  }

  /**
   * 获取模组加载器信息
   * @param modLoaderName 模组加载器名称
   * @returns 模组加载器信息
   */
  async getSpecificModLoaders(modLoaderName: string) {
    const uri = `/v1/minecraft/modloader/${modLoaderName}`;
    return this.get<DataResponse<MinecraftModLoaderVersion>>(uri);
  }
  // #endregion
}

export default CurseForgeApi;
