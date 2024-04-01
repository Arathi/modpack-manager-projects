import CurseForgeApi, {
  GAME_ID_MINECRAFT,
  CLASS_ID_MODS,
  SearchModsParameters,
} from '@modpack-manager/curseforge-api';

import Category from '@/domains/category';
import Mod from '@/domains/mod';
import SearchResults from '@/domains/search-results';
import { SearchModsConditions } from '@/domains/conditions';

class CurseForgeClient {
  api: CurseForgeApi;

  constructor(apiKey: string) {
    this.api = new CurseForgeApi({ apiKey });
  }

  setApiKey(apiKey: string) {
    this.api.apiKey = apiKey;
  }

  async getCategories(): Promise<Category[]> {
    const resp = await this.api.getCategories(GAME_ID_MINECRAFT);
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

  async searchMods(
    conditions: SearchModsConditions = {},
  ): Promise<SearchResults<Mod>> {
    console.info(`开始搜索MOD：`, conditions);
    const params: SearchModsParameters = {
      gameId: GAME_ID_MINECRAFT,
    };
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
}

export default CurseForgeClient;
