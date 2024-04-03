import CurseForgeApi, {
  GAME_ID_MINECRAFT,
  CLASS_ID_MODS,
  type SearchModsParameters,
  ModLoaderType,
} from '@modpack-manager/curseforge-api';

import Category from '@/domains/category';
import Mod from '@/domains/mod';
import ModFile from '@/domains/mod-file';
import { ModLoader } from '@/domains/mod-loader';
import SearchResults from '@/domains/search-results';
import type {
  SearchModsConditions,
  SearchModFilesConditions,
} from '@/domains/conditions';

const MAX_PAGE_SIZE = 50;

class CurseForgeClient {
  api: CurseForgeApi;

  constructor(apiKey: string) {
    this.api = new CurseForgeApi({ apiKey });
  }

  setApiKey(apiKey: string) {
    this.api.setApiKey(apiKey);
  }

  // #region 转换规则
  private toModLoaderType(
    modLoader: ModLoader | undefined,
  ): ModLoaderType | undefined {
    if (modLoader === undefined) {
      return undefined;
    }

    let modLoaderType: ModLoaderType | undefined;
    switch (modLoader) {
      case ModLoader.Forge:
        modLoaderType = ModLoaderType.Forge;
        break;
      case ModLoader.Fabric:
        modLoaderType = ModLoaderType.Fabric;
        break;
      case ModLoader.Quilt:
        modLoaderType = ModLoaderType.Quilt;
        break;
      case ModLoader.NeoForge:
        modLoaderType = ModLoaderType.NeoForge;
        break;
      default:
        modLoaderType = undefined;
        break;
    }

    return modLoaderType;
  }
  // #endregion

  async getCategories(): Promise<Category[]> {
    const resp = await this.api.getCategories({});
    const categories: Category[] = [];
    resp.data.forEach(cat => {
      const parent =
        cat.parentCategoryId !== CLASS_ID_MODS
          ? cat.parentCategoryId
          : undefined;
      categories.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.iconUrl,
        parent,
      });
    });
    return categories;
  }

  async searchMods({
    categories,
    gameVersions,
    keywords,
    modLoaders,
    slug,
    index = 0,
    pageSize = MAX_PAGE_SIZE,
  }: SearchModsConditions): Promise<SearchResults<Mod>> {
    const params: SearchModsParameters = {
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MODS,
      searchFilter: keywords,
      slug,
      index,
      pageSize,
    };

    // categoryId / categoryIds
    if (categories !== undefined) {
      if (categories.length === 1) {
        params.categoryId = categories[0];
      } else if (categories.length > 1) {
        params.categoryIds = categories.join(',');
      }
    }

    // gameVersion / gameVersions
    if (gameVersions !== undefined) {
      if (gameVersions.length === 1) {
        params.gameVersion = gameVersions[0];
      } else if (gameVersions.length > 1) {
        params.gameVersions = gameVersions.join(',');
      }
    }

    // modLoaderType / modLoaderTypes
    if (modLoaders !== undefined) {
      if (modLoaders.length === 1) {
        params.modLoaderType = this.toModLoaderType(modLoaders[0]);
      } else if (modLoaders.length > 1) {
        params.modLoaderTypes = modLoaders
          .map(ldr => this.toModLoaderType(ldr))
          .join(',');
      }
    }

    const resp = await this.api.searchMods(params);

    const mods = resp.data.map(mod => ({
      id: mod.id,
      slug: mod.slug,
      name: mod.name,
    }));

    return {
      results: mods,
      pagination: {
        index: resp.pagination.index,
        pageSize: resp.pagination.pageSize,
        amount: resp.pagination.resultCount,
        total: resp.pagination.totalCount,
      },
    };
  }

  async getMod(id: number | string): Promise<Mod> {
    if (typeof id === 'number') {
      return this.getModById(id);
    } else if (typeof id === 'string') {
      return this.getModBySlug(id);
    }
    throw new Error(`错误的id类型${id}(${typeof id})`, id);
  }

  private async getModById(modId: number): Promise<Mod> {
    console.info(`获取MOD：#${modId}`);
    const { data } = await this.api.getMod(modId);
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
    };
  }

  private async getModBySlug(slug: string): Promise<Mod> {
    const resp = await this.api.searchMods({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MODS,
      slug,
    });
    console.info(`获取MOD：@${slug}`, resp);

    if (resp.data.length === 0) {
      throw new Error(`未获取到slug为${slug}的MOD`);
    }

    if (resp.data.length > 1) {
      throw new Error(`获取到slug为${slug}的MOD不唯一（${resp.data.length}）`);
    }

    const mod = resp.data[0];
    return {
      id: mod.id,
      slug: mod.slug,
      name: mod.name,
    };
  }

  async getModFile(
    modId: number | string,
    fileId: number | string,
  ): Promise<ModFile> {
    if (typeof modId === 'string') {
      throw new Error(`modId类型错误`);
    }

    if (typeof fileId === 'string') {
      throw new Error(`fileId类型错误`);
    }

    const resp = await this.api.getModFile(modId, fileId);
    const file = resp.data;
    return {
      id: fileId,
      modId,
      name: file.fileName,
      url: file.downloadUrl,
    };
  }

  async searchModFiles({
    modId,
    gameVersion,
    modLoader,
    index = 0,
    pageSize = MAX_PAGE_SIZE,
  }: SearchModFilesConditions): Promise<SearchResults<ModFile>> {
    if (typeof modId === 'string') {
      throw new Error(`modId类型错误`);
    }
    const modLoaderType = this.toModLoaderType(modLoader);

    const resp = await this.api.getModFiles(modId, {
      gameVersion,
      modLoaderType,
      index,
      pageSize,
    });
    const { data, pagination } = resp;
    const results: ModFile[] = data.map(file => ({
      id: file.id,
      modId: file.modId,
      name: file.fileName,
      url: file.downloadUrl,
    }));
    return {
      results,
      pagination: {
        index: pagination.index,
        pageSize: pagination.pageSize,
        amount: pagination.resultCount,
        total: pagination.totalCount,
      },
    };
  }
}

export default CurseForgeClient;
