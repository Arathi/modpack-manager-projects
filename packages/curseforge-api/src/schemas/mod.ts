import type { Category } from "./category";

export interface Mod {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  summary: string;
  primaryCategoryId: number;
  categories: Category[];
  classId: number;
  authors: Author[];
  logo: Image;
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
}

export interface Image {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface Author {
  id: number;
  name: string;
  url: string;
  avatarUrl: string;
}

export interface SearchParameters {
  gameId?: number;
  classId?: number;
  categoryId?: number;
  categoryIds?: string;
  gameVersion?: string;
  gameVersions?: string;
  searchFilter?: string;
  sortField?: number;
  sortOrder?: SortOrder;
  modLoaderType?: number;
  modLoaderTypes?: string;
  gameVersionTypeId?: number;
  authorId?: number;
  primaryAuthorId?: number;
  slug?: string;
  index?: number;
  pageSize?: number;
}

export type SortOrder = "asc" | "desc";
