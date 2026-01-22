import { describe, expect, test } from "vitest";
import { Client } from "../src/index";
import { formatCategory } from "../src/utils";
import { SortingMethod } from "../src/schemas/requests";

describe("Modrinth Client", async () => {
  const client = new Client({});

  test("getCategories", async () => {
    const categories = await client.getCategories();
    console.info(`获取分类 ${categories.length} 个`);
    for (const cat of categories) {
      if (cat.project_type !== "mod") continue;
      console.info(`${cat.header} / ${cat.name} / ${formatCategory(cat.name)}`);
    }
  });

  test("search", async () => {
    const categories = [["categories:adventure"], ["categories:mobs"]];
    const versions = ["versions:1.20.1", "versions:1.21.1"];
    const loaders = ["categories:fabric", "categories:neoforge"];
    const environments = [["server_side:required"], ["client_side:required"]];
    const res = await client.searchProjects({
      query: "cobblemon",
      facets: [
        ["project_type:mod"],
        ...categories,
        versions,
        loaders,
        ...environments,
      ],
      index: SortingMethod.Relevance,
      offset: 0,
      limit: 50,
    });
    console.info("搜索结果如下：");
    const { hits: projects, offset, limit, total_hits: total } = res;
    console.info(
      `分页：${offset + 1} ~ ${offset + projects.length} / ${total}`,
    );
    projects.forEach((p) => {
      console.info(`${p.project_id} / ${p.slug} / ${p.author} / ${p.title}`);
    });
  });
});
