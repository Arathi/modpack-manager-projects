import { ModLoader } from './mod-loader';

export interface SearchModsConditions {
  categories?: number[];
  gameVersions?: string[];
  keywords?: string;
  modLoaders?: ModLoader[];
  slug?: string;
  index?: number;
  pageSize?: number;
}

export interface SearchModFilesConditions {
  modId: number;
  gameVersion?: string;
  modLoader?: ModLoader;
  index?: number;
  pageSize?: number;
}
