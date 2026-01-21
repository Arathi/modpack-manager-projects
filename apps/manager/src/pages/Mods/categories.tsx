import type { Category } from "@/domains/category";
import { store } from "@/stores/search";
import { Checkbox, Flex } from "antd";
import type React from "react";
import { useSnapshot } from "valtio";

const Categories = () => {
  const snap = useSnapshot(store);
  const checkboxes: React.ReactNode[] = [];

  function addCheckboxes(categories: Category[], level: number) {
    for (const cat of categories) {
      const paddingLeft = level * 16;
      let icon: React.ReactNode = null;
      if (cat.icon.startsWith("http")) {
        icon = <img alt={cat.slug} src={cat.icon} width={16} height={16} />;
      } else if (cat.icon.startsWith("<svg ") && cat.icon.endsWith("</svg>")) {
        icon = (
          <div
            dangerouslySetInnerHTML={{ __html: cat.icon }}
            style={{ width: 16, height: 16 }}
          />
        );
      }
      checkboxes.push(
        <Checkbox key={cat.id} value={cat.id} style={{ paddingLeft }}>
          <Flex align="center" gap={8}>
            {icon}
            <span>{cat.name}</span>
          </Flex>
        </Checkbox>,
      );
      if (cat.children.length > 0) {
        addCheckboxes(cat.children, level + 1);
      }
    }
  }

  addCheckboxes(snap.categories as Category[], 0);

  return <Flex vertical>{checkboxes}</Flex>;
};

export default Categories;
