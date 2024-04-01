import { Flex, Input, Pagination, Select, SelectProps } from 'antd';
import {
  ModsSearchSortField,
  type SortOrder,
} from '@modpack-manager/curseforge-api';
import CategoryList from './category-list';
import ModLoaderList from './mod-loader-list';
import GameVersionList from './game-version-list';
import ResultList from './result-list';

const Search = () => {
  const sortFields: SelectProps<ModsSearchSortField>['options'] = [
    {
      value: ModsSearchSortField.Featured,
      label: '特性',
    },
    {
      value: ModsSearchSortField.Popularity,
      label: '流行度',
    },
    {
      value: ModsSearchSortField.LastUpdated,
      label: '最后更新',
    },
    {
      value: ModsSearchSortField.Name,
      label: '名称',
    },
    {
      value: ModsSearchSortField.Author,
      label: '作者',
    },
    {
      value: ModsSearchSortField.TotalDownloads,
      label: '总下载量',
    },
    {
      value: ModsSearchSortField.Category,
      label: '分类',
    },
    {
      value: ModsSearchSortField.GameVersion,
      label: '游戏版本',
    },
    {
      value: ModsSearchSortField.EarlyAccess,
      label: 'Early Access',
    },
    {
      value: ModsSearchSortField.FeaturedReleased,
      label: 'Featured Released',
    },
    {
      value: ModsSearchSortField.ReleasedDate,
      label: '发布时间',
    },
    {
      value: ModsSearchSortField.Rating,
      label: '评分',
    },
  ];

  const sortOrders: SelectProps<SortOrder>['options'] = [
    {
      value: 'asc',
      label: '正序',
    },
    {
      value: 'desc',
      label: '倒序',
    },
  ];

  return (
    <Flex>
      <Flex vertical gap={8}>
        <CategoryList />
        <ModLoaderList />
        <GameVersionList />
      </Flex>
      <Flex vertical gap={8}>
        <Input placeholder={'MOD搜索相关关键字：#id / @slug / keyword'} />
        <Flex gap={8}>
          <Select
            options={sortFields}
            defaultValue={ModsSearchSortField.Popularity}
            placeholder={'排序字段'}
          />
          <Select
            options={sortOrders}
            defaultValue={'desc'}
            placeholder={'排序规则'}
          />
          <Pagination />
        </Flex>
        <ResultList mods={[]} />
      </Flex>
    </Flex>
  );
};

export default Search;
