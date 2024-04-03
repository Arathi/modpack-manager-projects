import { Helmet } from '@modern-js/runtime/head';
import { Flex, Button, Input } from 'antd';
import CurseForgeApi, {
  SearchModsParameters,
} from '@modpack-manager/curseforge-api';
import { useModel } from '@modern-js/runtime/model';
import { useMemo } from 'react';
import curseforgeApiModel from '@/models/curseforge-api-model';

const Index = () => {
  const [curseforgeApiState, curseforgeApiActions] =
    useModel(curseforgeApiModel);
  const { apiKey } = curseforgeApiState;
  const api = useMemo(() => new CurseForgeApi({ apiKey }), [apiKey]);

  function getGame() {
    api.getGame().then(resp => {
      console.info(`Get Game: `, resp);
    });
  }

  function getVersions() {
    api.getVersions().then(resp => {
      console.info(`Get Version: `, resp);
    });
  }

  function getVersionTypes() {
    api.getVersionTypes().then(resp => {
      console.info(`Get Version Types: `, resp);
    });
  }

  function getCategories() {
    api.getCategories({}).then(resp => {
      console.info(`Get Categories: `, resp);
    });
  }

  function searchMods() {
    const params: SearchModsParameters = {
      gameId: 432,
    };
    api.searchMods(params).then(resp => {
      console.info(`搜索Mods：`, resp);
    });
  }

  return (
    <>
      <Helmet title={'CurseForge 客户端测试'} />
      <Flex vertical gap={8}>
        <Flex>
          <Input
            value={apiKey}
            onChange={e => curseforgeApiActions.setApiKey(e.target.value)}
            placeholder={'API_KEY'}
          />
        </Flex>
        <Flex gap={8}>
          <Button onClick={() => getGame()}>获取游戏信息</Button>
          <Button onClick={() => getVersions()}>获取版本信息</Button>
          <Button onClick={() => getVersionTypes()}>获取版本类型</Button>
        </Flex>
        <Flex gap={8}>
          <Button onClick={() => getCategories()}>获取分类</Button>
        </Flex>
        <Flex gap={8}>
          <Button onClick={() => searchMods()}>搜索</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Index;
