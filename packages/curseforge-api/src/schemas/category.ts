export interface Category {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  url: string;
  iconUrl: string;
  dateModified: string;
  isClass: boolean;
  classId: number;
  parentCategoryId: number;
}

export interface GetCategoriesParameters {
  gameId?: number;
  classId?: number;
  classesOnly?: boolean;
}
