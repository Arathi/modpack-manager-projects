import type { Category } from "@/domains/category";
import type { Environment } from "@/domains/environment";
import type { Loader } from "@/domains/loader";
import type { Mod } from "@/domains/mod";
import type { ModFile } from "@/domains/mod-file";
import type { SortRule } from "@/domains/sort-rule";

export type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};

export type SearchResults<T> = {
  data: T[];
  pagination: Pagination;
};

export type SearchConditions = {
  versions: string[];
  loaders: Loader[];
  categories: string[];
  environments: Environment[];
  keyword: string;
  sortRule: SortRule;
};

export type ModFilesConditions = {
  version: string;
  loader: Loader;
};

export abstract class ClientAdapter {
  /**
   * 获取分类树
   */
  abstract getCategories(): Promise<Array<Category>>;

  /**
   * 搜索模组
   *
   * @param conditions
   * @param pagination
   */
  abstract search(
    conditions: SearchConditions,
    pagination: Pagination,
  ): Promise<SearchResults<Mod>>;

  /**
   * 获取模组文件表
   *
   * @param modId
   * @param conditions
   * @param pagination
   */
  abstract getModFiles(
    modId: string,
    conditions: ModFilesConditions,
    pagination: Pagination,
  ): Promise<SearchResults<ModFile>>;
}
