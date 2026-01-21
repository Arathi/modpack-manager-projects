import { describe, test } from "vitest";
import {
  AbstractClient,
  CLASS_ID_MODS,
  GAME_ID_MINECRAFT,
} from "../src/abstract-client";
import { fetch } from "undici";
import { ModLoaderType } from "../src/schemas/mod-loader-type";

const API_KEY = process.env.CURSE_FORGE_API_KEY ?? "";
const MOD_ID_WAYSTONES = 245755;

class UndiciClient extends AbstractClient {
  async send<R>(method: string, url: URL): Promise<R> {
    const headers = {
      "x-api-key": this.apiKey,
    };

    const res = await fetch(url, {
      method,
      headers,
    });

    if (res.status !== 200) {
      console.error("发送请求失败，状态码：", res.status);
      throw new Error("发送请求失败");
    }

    return (await res.json()) as R;
  }
}

describe("CurseForge API Undici 客户端测试", async () => {
  console.info(`正在构建客户端，API_KEY = "${API_KEY}"`);
  const client = new UndiciClient({
    apiKey: API_KEY,
  });

  test("getCategories", async () => {
    console.info("正在获取分类");
    const { data: categories } = await client.getCategories({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MODS,
    });
    console.info("获取分类如下：");
    for (const category of categories) {
      console.info(`${category.id} / ${category.slug} / ${category.name}`);
    }
  });

  test("searchMods", async () => {
    console.info("正在搜索模组");
    const { data: mods, pagination } = await client.searchMods({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MODS,
    });

    console.info("获取分页信息如下：");
    const { index, resultCount, totalCount } = pagination;
    console.info(`${index + 1} ~ ${index + resultCount} / ${totalCount}`);

    console.info("获取模组如下：");
    for (const mod of mods) {
      console.info(`${mod.id} / ${mod.slug} / ${mod.name}`);
    }
  });

  test("getModFiles", async () => {
    console.info("正在搜索模组文件");
    const modId = MOD_ID_WAYSTONES;
    const { data: files, pagination } = await client.getModFiles(modId, {
      gameVersion: "1.21.1",
      modLoaderType: ModLoaderType.NeoForge,
    });

    console.info("获取分页信息如下：");
    const { index, resultCount, totalCount } = pagination;
    console.info(`${index + 1} ~ ${index + resultCount} / ${totalCount}`);

    console.info("获取模组文件如下：");
    for (const file of files) {
      console.info(
        `${file.id} / ${file.fileName} / ${file.fileLength} / ${file.fileDate}`,
      );
    }
  });
});
