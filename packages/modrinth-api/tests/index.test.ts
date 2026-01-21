import { describe, expect, test } from "vitest";
import { Client } from "../src/index";
import { formatCategory } from "../src/utils";

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
});
