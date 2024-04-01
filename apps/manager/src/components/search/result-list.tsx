import { Empty, Flex, Image } from 'antd';
import { Category, Mod } from '@modpack-manager/curseforge-api';
import { CSSProperties } from 'react';

type ResultProps = {
  mod: Mod;
};
const Result: React.FC<ResultProps> = ({ mod }) => {
  const categories: React.ReactNode[] = [];
  mod.categories.forEach(cat => {
    categories.push(<CategoryIcon category={cat} />);
  });
  return (
    <Flex>
      <Image />
      <Flex vertical>
        <Flex className={'author-and-name'}>
          <span>{mod.authors[0].name}</span>
          <span>/</span>
          <span>{mod.name}</span>
        </Flex>
        <Flex className={'summary'}>{mod.summary}</Flex>
        <Flex className={'details'}>
          <Detail>{mod.dateCreated}</Detail>
          <Detail>{mod.dateModified}</Detail>
          <Detail>{`${mod.downloadCount}`}</Detail>
        </Flex>
        <Flex className={'categories'}>{categories}</Flex>
      </Flex>
    </Flex>
  );
};

type CategoryIconProps = {
  category: Category;
  size?: number;
  style?: CSSProperties;
};
const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  size = 30,
  style,
}) => {
  return (
    <Flex style={style}>
      <Image src={category.iconUrl} width={size} height={size} />
    </Flex>
  );
};

type DetailProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
const Detail: React.FC<DetailProps> = ({ icon, children }) => {
  return (
    <Flex>
      {icon}
      {children}
    </Flex>
  );
};

type ResultListProps = {
  mods: Mod[];
};
const ResultList: React.FC<ResultListProps> = ({ mods }) => {
  if (mods.length === 0) {
    return <Empty />;
  }

  const results: React.ReactNode[] = [];
  mods.forEach(mod => {
    const result = <Result key={mod.id} mod={mod} />;
    results.push(result);
  });
  return <Flex vertical>{results}</Flex>;
};

export default ResultList;
