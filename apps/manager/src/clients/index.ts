import SearchResults from '@/domains/search-results';
import Mod from '@/domains/mod';
import Category from '@/domains/category';

interface BaseClient {
  getCategories: () => Promise<Category[]>;
  searchMods: () => Promise<SearchResults<Mod>>;
}

export default BaseClient;
