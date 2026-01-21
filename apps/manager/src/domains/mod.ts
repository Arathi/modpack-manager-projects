export interface Mod {
  source: string;
  id: string;
  name: string;
  author: Author;
  logo: string;
  description: string;
}

interface Author {
  id: string;
  name: string;
  url: string;
}
