import { ModLoaderType } from './common';
import Mod from './mod';

// #region 基础类型
/**
 * 带有data字段的响应报文
 */
export interface DataResponse<Data> {
  data: Data;
}

/**
 * data字段是固定类型数组的响应报文
 */
export type ListResponse<Data> = DataResponse<Data[]>;

/**
 * 分页信息
 */
export interface Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

/**
 * 分页响应报文
 */
export type PaginationResponse<Data> = ListResponse<Data> & {
  pagination: Pagination;
};
// #endregion

// #region Game
export interface GameVersionsByType {
  type: number;
  versions: string[];
}

export interface GameVersionsByTypeV2 {
  type: number;
  versions: GameVersion[];
}

export interface GameVersion {
  id: number;
  slug: string;
  name: string;
}

export enum GameVersionStatus {
  Approved = 1,
  Deleted = 2,
  New = 3,
}

export interface GameVersionType {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  isSyncable: boolean;
  status: GameVersionTypeStatus;
}

export enum GameVersionTypeStatus {
  Normal = 1,
  Deleted = 2,
}
// #endregion

// #region Mods
export interface FeaturedModsResponse {
  featured: Mod[];
  popular: Mod[];
  recentlyUpdated: Mod[];
}
// #endregion

// #region Minecraft
export interface MinecraftGameVersion {
  id: number;
  gameVersionId: number;
  versionString: string;
  jarDownloadUrl: string;
  jsonDownloadUrl: string;
  approved: boolean;
  dateModified: string;
  gameVersionTypeId: number;
  gameVersionStatus: GameVersionStatus;
  gameVersionTypeStatus: GameVersionTypeStatus;
}

export interface MinecraftModLoaderIndex {
  name: string;
  gameVersion: string;
  latest: boolean;
  recommended: boolean;
  dateModified: string;
  type: ModLoaderType;
}

export interface MinecraftModLoaderVersion {
  id: number;
  gameVersionId: number;
  minecraftGameVersionId: number;
  forgeVersion: string;
  name: string;
  type: ModLoaderType;
  downloadUrl: string;
  filename: string;
  installMethod: ModLoaderInstallMethod;
  latest: boolean;
  recommended: boolean;
  approved: boolean;
  dateModified: string;
  mavenVersionString: string;
  versionJson: string;
  librariesInstallLocation: string;
  minecraftVersion: string;
  additionalFilesJson: string;
  modLoaderGameVersionId: number;
  modLoaderGameVersionTypeId: number;
  modLoaderGameVersionStatus: GameVersionStatus;
  modLoaderGameVersionTypeStatus: GameVersionTypeStatus;
  mcGameVersionId: number;
  mcGameVersionTypeId: number;
  mcGameVersionStatus: GameVersionStatus;
  mcGameVersionTypeStatus: GameVersionTypeStatus;
  installProfileJson: string;
}

export enum ModLoaderInstallMethod {
  ForgeInstaller = 1,
  ForgeJarInstall = 2,
  ForgeInstallerV2 = 3,
}
// #endregion
