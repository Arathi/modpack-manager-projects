import type { CollapseProps } from "antd";
import { Checkbox, Collapse, Flex, Input } from "antd";
import { useEffect, useMemo, useState } from "react";
import { MinecraftVersions } from "@/domains/version";

type Props = {
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  height?: number;
};

const Versions: React.FC<Props> = ({
  defaultValue = [],
  onChange,
  height = 500,
}) => {
  const [values, setValues] = useState<string[]>(defaultValue);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(values);
    }
  }, [values]);

  const versionOptions = useMemo(() => {
    const keyword = filter.trim();

    const items: CollapseProps["items"] = [];
    const keys: string[] = [];
    for (const mcv of MinecraftVersions) {
      let matched = 0;
      const options: React.ReactNode[] = [];
      for (let minor = mcv.end; minor >= mcv.start; minor--) {
        const version = minor === 0 ? mcv.major : `${mcv.major}.${minor}`;
        const hidden = version.indexOf(keyword) < 0;
        if (!hidden) {
          matched++;
        }
        options.push(
          <Checkbox
            key={version}
            name="versions"
            value={version}
            checked={values.indexOf(version) >= 0}
            onChange={(event) => {
              if (event.target.checked) {
                console.info("选择", version);
                setValues([...values, version]);
              } else {
                console.info("取消选择", version);
                setValues(values.filter((v) => v !== version));
              }
            }}
            style={{
              display: hidden ? "none" : undefined,
            }}
          >
            {version}
          </Checkbox>,
        );
      }

      const key = `${mcv.major}.${mcv.start}`;
      items.push({
        key,
        label: <span style={{ color: "gray" }}>{mcv.name}</span>,
        styles: {
          header: {
            display: matched === 0 ? "none" : undefined,
            padding: 2,
          },
          body: {
            display: matched === 0 ? "none" : undefined,
            padding: 2,
          },
        },
        children: <Flex vertical>{options}</Flex>,
      });
      keys.push(key);
    }

    return (
      <Collapse
        items={items}
        expandIconPlacement="end"
        ghost={true}
        size="small"
        defaultActiveKey={keys}
      />
    );
  }, [filter, values]);

  useEffect(() => {
    console.info("加载 Minecraft 版本列表");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: height,
        overflowY: "scroll",
        paddingRight: 8,
      }}
    >
      <Input
        placeholder="版本号过滤器"
        value={filter}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setFilter(value);
        }}
      />
      {versionOptions}
    </div>
  );
};

export default Versions;
