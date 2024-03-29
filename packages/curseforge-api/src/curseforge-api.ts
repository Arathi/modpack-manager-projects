import axios, { AxiosInstance, AxiosHeaders } from 'axios';
import {
  GetFeaturedModsRequestBody,
  GetModFilesRequestBody,
  GetModsByIdsListRequestBody,
  SearchModsParameters,
} from './schema/requests';
import { DataResponse } from './schema/responses';
import { ModLoaderType } from './schema/common';
import Game from './schema/game';

const BASE_URL = 'https://api.curseforge.com';
const GAME_ID_MINECRAFT = 432;
const CLASS_ID_MODS = 6;

type QueryParamValue = string | number | boolean | undefined;
type QueryParams = Record<string, QueryParamValue>;

class CurseForgeApi {
  /**
   * API地址
   */
  baseURL: string;

  /**
   * API_KEY
   */
  apiKey: string;

  /**
   * Axios
   */
  axios: AxiosInstance;

  constructor({ baseURL = BASE_URL, apiKey = '' }) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.axios = axios.create({});
  }

  get headers() {
    const headers = new AxiosHeaders();
    headers.set('x-api-key', this.apiKey);
    return headers;
  }

  async get<R>(uri: string, params?: QueryParams): Promise<R> {
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
    console.info(`发起GET请求：${url}`);
    console.info(`Headers: `, this.headers);
    const resp = await this.axios.get<R>(url.toString(), {
      headers: this.headers,
    });
    if (resp.status !== 200) {
      throw new Error(`HTTP请求失败，返回状态码：${resp.status}`);
    }
    return resp.data;
  }

  async post<R>(uri: string, body?: any): Promise<R> {
    const url = new URL(`${this.baseURL}${uri}`);
    console.info(`发起POST请求：${url}，报文如下：`, body);
    const resp = await this.axios.post<R>(url.toString(), body, {
      headers: this.headers,
    });
    if (resp.status !== 200) {
      throw new Error(`HTTP请求失败，返回状态码：${resp.status}`);
    }
    return resp.data;
  }

  // #region Games
  async getGame(gameId = GAME_ID_MINECRAFT) {
    console.info(`获取游戏信息：${gameId}`);
    const uri = `/v1/games/${gameId}`;
    return this.get<DataResponse<Game>>(uri);
  }

  async getVersions(gameId = GAME_ID_MINECRAFT) {
    console.info(`获取游戏版本信息：${gameId}`);
  }

  async getVersionTypes(gameId = GAME_ID_MINECRAFT) {
    console.info(`获取版本类型：${gameId}`);
  }

  async getVersionsV2(gameId = GAME_ID_MINECRAFT) {
    console.info(`获取版本信息V2：${gameId}`);
  }
  // #endregion

  // #region Categories
  async getCategories(
    gameId = GAME_ID_MINECRAFT,
    classId = CLASS_ID_MODS,
    classesOnly = false,
  ) {
    const url = new URL(`${this.baseURL}/v1/categories`);
    url.searchParams.append('gameId', `${gameId}`);
    url.searchParams.append('classId', `${classId}`);
    url.searchParams.append('classesOnly', `${classesOnly}`);
    console.info(`获取分类：`, url.searchParams);
  }
  // #endregion

  // #region Mods
  // buildSearchModsParameters(
  //   conditions: SearchModsConditions,
  // ): SearchModsParameters {
  //   return {
  //     gameId: GAME_ID_MINECRAFT,
  //   };
  // }

  /**
   * 根据条件搜索MOD
   * @param params 搜索条件
   */
  async searchMods(params: SearchModsParameters) {
    console.info(`搜索Mod：`, params);
  }

  /**
   * 获取指定编号的MOD
   * @param modId
   */
  async getMod(modId: number) {
    console.info(`获取MOD：`, modId);
  }

  /**
   * 获取MOD列表
   * @param body 编号列表
   */
  async getMods(body: GetModsByIdsListRequestBody) {
    // POST /v1/mods
    console.info(`获取Mod列表：`, body);
  }

  /**
   * 获取特定MOD
   * @param body 游戏ID、排除MOD列表、指定游戏版本类型ID
   */
  async getFeaturedMods(body: GetFeaturedModsRequestBody) {
    console.info(`获取特定Mod：`, body);
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
  ) {
    console.info(`获取特定Mod：`, {
      modId,
      raw,
      stripped,
      markup,
    });
  }
  // #endregion

  // #region Files
  async getModFile(modId: number, fileId: number) {
    console.info(`获取MOD文件（${modId}/${fileId}）`);
  }

  async getModFiles(
    modId: number,
    gameVersion?: string,
    modLoaderType?: ModLoaderType,
    gameVersionTypeId?: number,
    index?: number,
    pageSize?: number,
  ) {
    console.info(`根据条件搜索MOD文件：`, {
      modId,
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    });
  }

  async getFiles(body: GetModFilesRequestBody) {
    console.info(`根据条件获取文件：`, body);
  }

  async getModFileChangeLog(modId: number, fileId: number) {
    console.info(`获取MOD文件（${modId}/${fileId}）修改记录`);
  }

  async getModFileDownloadURL(modId: number, fileId: number) {
    console.info(`获取MOD文件（${modId}/${fileId}）下载地址`);
  }
  // #endregion

  // #region Minecraft
  async getMinecraftVersions(sortDescending?: boolean) {
    const uri = `/v1/minecraft/version`;
    const params: QueryParams = {};
    if (sortDescending !== undefined) {
      params.sortDescending = sortDescending;
    }
    return this.get(uri, params);
  }

  async getSpecificMinecraftVersion(gameVersionString: string) {
    const uri = `/v1/minecraft/version/${gameVersionString}`;
    return this.get(uri);
  }

  async getMinecraftModLoaders() {
    //
  }

  async getSpecificModLoaders() {
    //
  }
  // #endregion
}

export default CurseForgeApi;
