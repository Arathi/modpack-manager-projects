import { ModLoaderType } from './common';

export interface SearchModsParameters {
  gameId: number;
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
  slug?: number;
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

export interface GetModFilesRequestBody {
  fileIds: number[];
}

export interface GetModsByIdsListRequestBody {
  modIds: number[];
  filterPcOnly?: boolean;
}

export interface GetFeaturedModsRequestBody {
  gameId: number;
  excludedModIds: number[];
  gameVersionTypeId?: number;
}
