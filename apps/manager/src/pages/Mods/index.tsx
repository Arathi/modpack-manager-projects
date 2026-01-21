import { SearchOutlined } from "@ant-design/icons";
import { Collapse, Input, Pagination, Select } from "antd";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import ModCard from "@/components/ModCard";
import { Environment } from "@/domains/environment";
import type { Loader } from "@/domains/loader";
import { store } from "@/stores/search";
import type { SearchConditions } from "@/utils/client-adapter";

import Categories from "./categories";
import Environments from "./environments";
import Loaders from "./loaders";
import Sources from "./sources";
import Versions from "./versions";

import "./index.less";
import { Source } from "@/domains/source";

const Page = () => {
  const snap = useSnapshot(store);

  const sortRuleOptions = [
    {
      value: "relevance",
      label: "关联性",
    },
    {
      value: "downloads",
      label: "下载量",
    },
    {
      value: "date-published",
      label: "发布时间",
    },
    {
      value: "date-updated",
      label: "更新时间",
    },
  ];

  useEffect(() => {
    store.init();
    // store.search();
  }, []);

  const modCards: React.ReactNode[] = [];
  snap.mods.forEach((mod) => {
    modCards.push(<ModCard key={mod.id} {...mod} />);
  });

  const environmentsDisabled = snap.source === Source.CurseForge;

  return (
    <>
      <div className="aside">
        <Sources
          options={[]}
          value={snap.source}
          onChange={(value) => {
            console.info("模组源发生变化：", value);
            store.source = value;
          }}
        />
        <Collapse
          className="collapse"
          bordered={false}
          expandIconPlacement="end"
          defaultActiveKey={["game-version"]}
          items={[
            {
              key: "game-version",
              label: <span style={{ fontWeight: "bold" }}>Minecraft 版本</span>,
              children: (
                <Versions
                  defaultValue={snap.conditions.versions as string[]}
                  onChange={(values) => {
                    console.info("Minecraft 版本发生变化：", values);
                    store.conditions = {
                      ...snap.conditions,
                      versions: values,
                    } as SearchConditions;
                  }}
                  height={320}
                />
              ),
            },
          ]}
        />
        <Collapse
          className="collapse"
          bordered={false}
          expandIconPlacement="end"
          defaultActiveKey={["mod-loader"]}
          items={[
            {
              key: "mod-loader",
              label: <span style={{ fontWeight: "bold" }}>模组加载器</span>,
              children: (
                <Loaders
                  value={snap.conditions.loaders as Loader[]}
                  onChange={(value) => {
                    console.info("模组加载器发生变化：", value);
                    store.conditions = {
                      ...snap.conditions,
                      loaders: value,
                    } as SearchConditions;
                  }}
                />
              ),
            },
          ]}
        />
        <Collapse
          className="collapse"
          bordered={false}
          expandIconPlacement="end"
          defaultActiveKey={["categories"]}
          items={[
            {
              key: "categories",
              label: <span style={{ fontWeight: "bold" }}>分类</span>,
              children: <Categories />,
            },
          ]}
        />
        <Collapse
          className="collapse"
          bordered={false}
          expandIconPlacement="end"
          defaultActiveKey={["environment"]}
          items={[
            {
              key: "environment",
              label: <span style={{ fontWeight: "bold" }}>运行环境</span>,
              children: (
                <Environments
                  value={snap.conditions.environments as Environment[]}
                  disabled={environmentsDisabled}
                  onChange={(value) => {
                    console.info("运行环境发生变化：", value);
                    store.conditions = {
                      ...snap.conditions,
                      environments: value,
                    } as SearchConditions;
                  }}
                />
              ),
            },
          ]}
        />
      </div>
      <div className="main-content">
        <Input
          prefix={<SearchOutlined />}
          placeholder="请输入模组名称关键字"
          value={snap.conditions.keyword}
          onChange={(event) => {
            const value = event.currentTarget.value;
            store.conditions = {
              ...snap.conditions,
              keyword: value,
            } as SearchConditions;
          }}
        />
        <div className="filter">
          <Select
            options={sortRuleOptions}
            style={{ width: 128 }}
            value={snap.conditions.sortRule}
            onChange={(value) => {
              store.conditions = {
                ...snap.conditions,
                sortRule: value,
              } as SearchConditions;
            }}
          />
          <div style={{ flex: 1 }} />
          <Pagination
            className="pagination"
            defaultCurrent={1}
            pageSizeOptions={[10, 20, 50]}
            {...snap.pagination}
            onChange={(current, pageSize) => {
              store.pagination = {
                ...snap.pagination,
                current,
                pageSize,
              };
              store.search();
            }}
          />
        </div>
        <div className="results">{modCards}</div>
      </div>
    </>
  );
};

export default Page;
