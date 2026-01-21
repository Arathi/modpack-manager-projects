/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { Category } from "./category";
import type { ModFile } from "./mod-file";

export interface Mod {
  screenshots: Asset[];
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links: Links;
  summary: string;
  status: number;
  downloadCount: number;
  isFeatured: boolean;
  primaryCategoryId: number;
  categories: Category[];
  classId: number;
  authors: Author[];
  logo: Asset;
  mainFileId: number;
  latestFiles: ModFile[];
  latestFilesIndexes: any[];
  latestEarlyAccessFilesIndexes: any[];
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  allowModDistribution: boolean;
  gamePopularityRank: number;
  isAvailable: boolean;
  hasCommentsEnabled: boolean;
  thumbsUpCount: number;
  featuredProjectTag: number;
  serverAffiliation?: any;
  socialLinks?: any[];
}

interface Asset {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

interface Links {
  websiteUrl: string;
  wikiUrl: string | null;
  issuesUrl: string | null;
  sourceUrl: string | null;
}

interface Author {
  id: number;
  name: string;
  url: string;
  avatarUrl: string;
}
