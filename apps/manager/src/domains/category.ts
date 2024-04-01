interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  parent?: number;
}

export default Category;
