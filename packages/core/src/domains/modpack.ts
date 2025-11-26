export interface Modpack {
  id: string;
  name: string;
  gameVersion: string;
  modLoader: string;
  mods?: Mod[];
  requireMods?: Mod[];
  optionalMods?: Mod[];
}

export interface Mod {
  source: string;
  id: number | string;
  slug: string;
  version: number | string;
}
