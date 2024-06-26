import { ModLoaderType } from './common';

// #region Categories
export interface GetCategoriesParams {
  gameId?: number;
  classId?: number;
  classesOnly?: boolean;
}
// #endregion

// #region Mods
export interface SearchModsParameters {
  gameId?: number;
  classId?: number;
  categoryId?: number;
  categoryIds?: string;
  gameVersion?: string;
  gameVersions?: string;
  searchFilter?: string;
  sortField?: ModsSearchSortField;
  sortOrder?: SortOrder;
  modLoaderType?: ModLoaderType;
  modLoaderTypes?: string;
  gameVersionTypeId?: number;
  authorId?: number;
  primaryAuthorId?: number;
  slug?: string;
  index?: number;
  pageSize?: number;
}

export enum ModsSearchSortField {
  Featured = 1,
  Popularity = 2,
  LastUpdated = 3,
  Name = 4,
  Author = 5,
  TotalDownloads = 6,
  Category = 7,
  GameVersion = 8,
  EarlyAccess = 9,
  FeaturedReleased = 10,
  ReleasedDate = 11,
  Rating = 12,
}

export type SortOrder = 'asc' | 'desc';

export interface GetModsByIdsListRequestBody {
  modIds: number[];
  filterPcOnly?: boolean;
}

export interface GetFeaturedModsRequestBody {
  gameId: number;
  excludedModIds: number[];
  gameVersionTypeId?: number;
}

export interface GetModDescriptionParams {
  raw?: boolean;
  stripped?: boolean;
  markup?: boolean;
}
// #endregion

// #region Files
export interface GetModFilesParams {
  gameVersion?: string;
  modLoaderType?: ModLoaderType;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}

export interface GetModFilesRequestBody {
  fileIds: number[];
}
// #endregion

// #region Minecraft
export interface GetMinecraftModLoadersParams {
  version?: string;
  includeAll?: boolean;
}
// #endregion
