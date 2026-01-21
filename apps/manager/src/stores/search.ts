import type {} from "@redux-devtools/extension";
import { proxy, ref } from "valtio";
import { devtools, subscribeKey } from "valtio/utils";
import type { Category } from "@/domains/category";
import type { Mod } from "@/domains/mod";
import { SortRule } from "@/domains/sort-rule";
import { Source } from "@/domains/source";
import type { Pagination, SearchConditions } from "@/utils/client-adapter";
import { CurseForgeAdapter } from "@/utils/curseforge-adapter";
import { ModrinthAdapter } from "@/utils/modrinth-adapter";

interface State {
  curseforge: CurseForgeAdapter;
  modrinth: ModrinthAdapter;
  source: Source;
  conditions: SearchConditions;
  pagination: Pagination;
  mods: Mod[];
  curseforgeCategories: Category[];
  modrinthCategories: Category[];
}

interface Computed {
  get categories(): Category[];
}

interface Actions {
  init(): Promise<void>;
  loadCategories(): Promise<void>;
  search(): Promise<void>;
}

export const store = proxy<State & Computed & Actions>({
  // #region State
  curseforge: ref(new CurseForgeAdapter()),
  modrinth: ref(new ModrinthAdapter()),
  source: Source.CurseForge,
  conditions: {
    versions: [],
    loaders: [],
    categories: [],
    environments: [],
    keyword: "",
    sortRule: SortRule.Relevance,
  },
  pagination: {
    current: 1,
    pageSize: 50,
    total: 0,
  },
  mods: [],
  curseforgeCategories: [],
  modrinthCategories: [],
  // #endregion

  // #region Computed
  get categories() {
    let categories: Category[] = [];
    switch (this.source) {
      case Source.CurseForge:
        categories = this.curseforgeCategories;
        break;
      case Source.Modrinth:
        categories = this.modrinthCategories;
        break;
    }
    return categories;
  },
  // #endregion

  // #region Actions
  async init() {
    this.loadCategories();
    this.search();
  },
  async loadCategories() {
    {
      const tree = await this.curseforge.getCategories();
      console.info("CurseForge 分类加载完成：", tree);
      this.curseforgeCategories = ref(tree);
    }
    {
      const tree = await this.modrinth.getCategories();
      console.info("Modrinth 分类加载完成：", tree);
      this.modrinthCategories = ref(tree);
    }
  },
  async search() {
    switch (this.source) {
      case Source.CurseForge: {
        const res = await this.curseforge.search(
          this.conditions,
          this.pagination,
        );
        this.mods = res.data;
        this.pagination = res.pagination;
        break;
      }
      case Source.Modrinth: {
        const res = await this.modrinth.search(
          this.conditions,
          this.pagination,
        );
        this.mods = res.data;
        this.pagination = res.pagination;
        break;
      }
    }
  },
  // #endregion
});

subscribeKey(store, "source", () => store.search());

subscribeKey(store, "conditions", () => store.search());

devtools(store, {
  name: "search",
  enabled: true,
});
