import axios, { AxiosHeaders } from "axios";
import { fetch } from "undici";
import { describe, expect, test } from "vitest";

import { CLASS_ID_MODS, Client } from "./client";

class ClientAxios extends Client {
  async send<T>(url: URL): Promise<T> {
    const headers = new AxiosHeaders();
    if (this.apiKey !== undefined) {
      headers.set("x-api-key", this.apiKey);
    }
    const res = await axios.request<T>({
      url: url.toString(),
      method: "GET",
      headers,
    });
    return res.data;
  }
}

class ClientUndici extends Client {
  async send<T>(url: URL): Promise<T> {
    const res = await fetch(url);
    const resBody = await res.json();
    return resBody as T;
  }
}

describe("CurseForge客户端", async () => {
  const apiKey = process.env.CURSEFORGE_API_KEY;
  console.info(`使用API_KEY: ${apiKey}`);

  const client = new ClientAxios({
    apiKey,
  });

  const SLUG_MODPACKS = "modpacks";
  const SLUG_UTILITY_QOL = "utility-qol";
  const SLUG_TECH = "tech";

  // #region Categories
  test("获取所有分类 (getCategories)", async () => {
    console.info("正在获取所有分类");

    const res = await client.getCategories();
    const categories = res.data;

    // 主分类 Mods，存在
    const mods = categories.find((it) => it.id === CLASS_ID_MODS);
    console.info(`mods = `, mods);
    expect(mods).not.toBeUndefined();

    // 主分类 Modpacks，存在
    const modpacks = categories.find((it) => it.slug === SLUG_MODPACKS);
    console.info(`modpacks = `, modpacks);
    expect(modpacks).not.toBeUndefined();

    // Mods 子分类 Utility & QoL，存在
    const utilityQOL = categories.find((it) => it.slug === SLUG_UTILITY_QOL);
    console.info(`utility-qol = `, utilityQOL);
    expect(utilityQOL).not.toBeUndefined();

    // Modpacks 子分类 Tech，存在
    const tech = categories.find((it) => it.slug === SLUG_TECH);
    console.info(`tech = `, tech);
    expect(tech).not.toBeUndefined();
  });

  test("获取主分类 (getCategories, classesOnly)", async () => {
    console.info("正在获取主分类");

    const res = await client.getCategories({ classesOnly: true });
    const categories = res.data;

    // 主分类 Mods，存在
    const mods = categories.find((it) => it.id === CLASS_ID_MODS);
    console.debug(`mods = `, mods);
    expect(mods).not.toBeUndefined();

    // 主分类 Modpacks，存在
    const modpacks = categories.find((it) => it.slug === SLUG_MODPACKS);
    console.debug(`modpacks = `, modpacks);
    expect(modpacks).not.toBeUndefined();

    // Mods 子分类 Utility & QoL，不存在
    const utilityQOL = categories.find((it) => it.slug === SLUG_UTILITY_QOL);
    console.debug(`utility-qol = `, utilityQOL);
    expect(utilityQOL).toBeUndefined();

    // Modpacks 子分类 Magic，不存在
    const tech = categories.find((it) => it.slug === SLUG_TECH);
    console.debug(`tech = `, tech);
    expect(tech).toBeUndefined();
  });

  test("获取mods子分类 (getCategories, mods)", async () => {
    console.info("正在获取 Mods 的子分类");

    const res = await client.getCategories({ classId: CLASS_ID_MODS });
    const categories = res.data;

    // 主分类 Mods，不存在
    const mods = categories.find((it) => it.id === CLASS_ID_MODS);
    console.debug(`mods = `, mods);
    expect(mods).toBeUndefined();

    // 主分类 Modpacks，不存在
    const modpacks = categories.find((it) => it.slug === SLUG_MODPACKS);
    console.debug(`modpacks = `, modpacks);
    expect(modpacks).toBeUndefined();

    // Mods 子分类 Utility & QoL，存在
    const utilityQOL = categories.find((it) => it.slug === SLUG_UTILITY_QOL);
    console.debug(`utility-qol = `, utilityQOL);
    expect(utilityQOL).not.toBeUndefined();

    // Modpacks 子分类 Magic，不存在
    const tech = categories.find((it) => it.slug === SLUG_TECH);
    console.debug(`tech = `, tech);
    expect(tech).toBeUndefined();
  });
  // #endregion

  // #region Mods
  test("搜索模组 (search, searchFilter)", async () => {
    const keyword = "waystones";
    const results = await client.search({
      searchFilter: keyword,
      sortOrder: "desc",
    });

    const { totalCount } = results.pagination;
    console.info(`根据关键字 ${keyword} 搜索模组，获得结果 ${totalCount} 条`);

    for (const mod of results.data) {
      const { id, slug, name } = mod;
      const author = mod.authors[0];
      console.info(`#${id} @${slug} ${author.name} / ${name}`);
    }
  });

  test("搜索模组 (search, slug)", async () => {
    const sid = "jei";
    const results = await client.search({
      slug: sid,
    });

    const { totalCount } = results.pagination;
    console.info(`根据slug ${sid} 搜索模组，获得结果 ${totalCount} 条`);

    const mods = results.data;
    expect(mods.length).toBe(1);

    const mod = mods[0];
    const author = mod.authors[0];
    const { id, slug, name } = mod;
    console.info(`#${id} @${slug} ${author.name} / ${name}`);
  });

  test("搜索模组 (search, gameVersion + modLoaderType)", async () => {
    const gameVersion = "1.20.1";
    const modLoaderType = 1; // Forge
    const results = await client.search({
      gameVersion,
      modLoaderType,
      sortField: 6,
      sortOrder: "desc",
    });

    const { totalCount } = results.pagination;
    console.info(
      `根据游戏版本(${gameVersion})和模组加载器(${modLoaderType})搜索模组，获得结果 ${totalCount} 条`,
    );

    for (const mod of results.data) {
      const { id, slug, name } = mod;
      const author = mod.authors[0];
      console.info(`#${id} @${slug} ${author.name} / ${name}`);
    }
  });

  test("获取指定模组 (getMod)", async () => {
    const modId = 248787;
    const res = await client.getMod(modId);
    const mod = res.data;
    const author = mod.authors[0];
    const { id, slug, name } = mod;
    console.info(`#${id} @${slug} ${author.name} / ${name}`);
  });
  // #endregion

  // #region Mod Files
  test("获取指定模组的指定文件（getModFile）", async () => {
    const modId = 245755;
    const fileId = 6856603;
    const res = await client.getModFile(modId, fileId);
    const file = res.data;
    console.info(
      `#${file.modId}/${file.id} ${file.fileName} ${file.fileSizeOnDisk}B ${file.fileDate}`,
    );
    const deps = file.dependencies;
    for (const dep of deps) {
      let depType: string | null = null;
      switch (dep.relationType) {
        case 1:
          depType = "嵌入";
          break;
        case 2:
          depType = "可选依赖";
          break;
        case 3:
          depType = "必要依赖";
          break;
        case 4:
          depType = "工具";
          break;
        case 5:
          depType = "不兼容";
          break;
        case 6:
          depType = "包含";
          break;
      }
      console.info(`\t${depType}\t${dep.modId}`);
    }
  });
  // #endregion
});
