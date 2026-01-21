import type { ModLoaderType } from "./mod-loader-type";

export interface GetCategoriesParameters {
  gameId: number;
  classId?: number;
  classesOnly?: boolean;
}

export interface SearchModsParameters {
  gameId: number;
  classId?: number;
  categoryId?: number;
  categoryIds?: string | Array<number>;
  gameVersion?: string;
  gameVersions?: string | Array<string>;
  searchFilter?: string;
  sortField?: SortField;
  sortOrder?: SortOrder;
  modLoaderType?: ModLoaderType;
  modLoaderTypes?: string | Array<ModLoaderType>;
  gameVersionTypeId?: number;
  authorId?: number;
  primaryAuthorId?: number;
  slug?: string;
  index?: number;
  pageSize?: number;
}

export interface GetModFilesParameters {
  gameVersion?: string;
  modLoaderType?: ModLoaderType;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}

export enum SortField {
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

type SortOrder = "asc" | "desc";
