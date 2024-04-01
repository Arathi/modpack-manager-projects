import { LoaderFunctionArgs } from '@modern-js/runtime/router';
import CurseForgeApi, {
  Pagination,
  Mod,
  SearchModsParameters,
} from '@modpack-manager/curseforge-api';

type SearchResultData = {
  data: Mod[];
  pagination: Pagination;
};

const api = new CurseForgeApi({
  apiKey: localStorage.getItem('CURSE_FORGE_API_KEY') ?? '',
});

export const loader = async (
  args: LoaderFunctionArgs,
): Promise<SearchResultData> => {
  const {
    categoryIds,
    gameVersions,
    searchFilter,
    sortField,
    sortOrder,
    modLoaderTypes,
    slug,
    index,
    pageSize,
  } = args.params;

  const params: SearchModsParameters = {
    gameId: 432,
    classId: 6,
  };
  if (categoryIds !== undefined) {
    params.categoryIds = categoryIds;
  }
  if (gameVersions !== undefined) {
    params.gameVersions = gameVersions;
  }
  if (searchFilter !== undefined) {
    params.searchFilter = searchFilter;
  }
  if (sortField !== undefined) {
    const value = parseInt(sortField, 10);
    // const name = ModsSearchSortField[value];
    params.sortField = value;
  }
  if (sortOrder !== undefined) {
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      params.sortOrder = sortOrder;
    }
  }
  if (modLoaderTypes !== undefined) {
    params.modLoaderTypes = modLoaderTypes;
  }
  if (slug !== undefined) {
    params.slug = slug;
  }
  if (index !== undefined) {
    const value = parseInt(index, 10);
    params.index = value;
  }
  if (pageSize !== undefined) {
    const value = parseInt(pageSize, 10);
    params.pageSize = value;
  }

  const resp = await api.searchMods(params);
  return {
    data: resp.data,
    pagination: resp.pagination,
  };
};
