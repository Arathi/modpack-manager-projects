import { readFile, writeFile } from "node:fs/promises";
import CurseForgeClient from "./curseforge";
import type { Mod, Modpack } from "./domains/modpack";

export interface InitOptions {
  gameVersion?: string;
}

class Adapter {
  curseforge: CurseForgeClient;

  constructor() {
    const apiKey = process.env.CURSEFORGE_API_KEY;
    this.curseforge = new CurseForgeClient({
      apiKey,
    });
  }

  private configPath(dir: string): string {
    const fileName = "modpack.json";
    return `${dir}/${fileName}`;
  }

  async init(
    dir: string,
    id: string,
    name: string,
    gameVersion: string,
    modLoader: string,
  ): Promise<void> {
    const modpack = {
      id,
      name,
      gameVersion,
      modLoader,
    } satisfies Modpack;
    const json = JSON.stringify(modpack);
    const path = this.configPath(dir);
    return await writeFile(path, json, { encoding: "utf-8" });
  }

  async load(dir: string): Promise<Modpack> {
    const path = this.configPath(dir);
    const json = await readFile(path, { encoding: "utf-8" });
    const modpack = JSON.parse(json) as Modpack;
    return modpack;
  }

  async search(dir: string) {
    const modpack = await this.load(dir);
    const { gameVersion, modLoader } = modpack;
    let modLoaderType: number | undefined = undefined;
    switch (modLoader) {
      case "forge":
        modLoaderType = 1;
        break;
      case "fabric":
        modLoaderType = 4;
        break;
      case "quilt":
        modLoaderType = 5;
        break;
      case "neo-forge":
        modLoaderType = 6;
        break;
    }

    const searchRes = await this.curseforge.search({
      classId: 6,
      gameVersion,
      modLoaderType,
    });

    const mods = searchRes.data;
    const results: Mod[] = [];

    for (const mod of mods) {
      const filesRes = await this.curseforge.getModFiles(mod.id, {
        gameVersion,
        modLoaderType,
      });
      const files = filesRes.data;
      const latest = files[0];
      results.push({
        source: "curseforge",
        id: mod.id,
        slug: mod.slug,
        version: latest.id,
      });
    }

    return results;
  }

  async add(dir: string, slug: string, version?: number | string) {
    const modpack = await this.load(dir);
    const { gameVersion, modLoader } = modpack;
    let modLoaderType: number | undefined = undefined;
    switch (modLoader) {
      case "forge":
        modLoaderType = 1;
        break;
      case "fabric":
        modLoaderType = 4;
        break;
      case "quilt":
        modLoaderType = 5;
        break;
      case "neo-forge":
        modLoaderType = 6;
        break;
    }

    const searchRes = await this.curseforge.search({
      classId: 6,
      gameVersion,
      modLoaderType,
      slug,
    });

    const mod = searchRes.data[0];

    const filesRes = await this.curseforge.getModFiles(mod.id, {
      gameVersion,
      modLoaderType,
    });
    const files = filesRes.data;
    const latest = files[0];

    // for (const dep of latest.dependencies) {
    //   switch () {
    //
    //   }
    // }
  }

  remove(dir: string, name: string) {
    //
  }

  install(dir: string) {
    //
  }
}

export default Adapter;
