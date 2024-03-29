import { Helmet } from '@modern-js/runtime/head';
import { Flex, Button, Input } from 'antd';
import { CurseForgeApi } from '@modpack-manager/curseforge-api';
import { useState } from 'react';

const api = new CurseForgeApi({
  apiKey: ``,
});

const Index = () => {
  const [apiKey, setApiKey] = useState('');

  function changeApiKey(nextApiKey: string) {
    setApiKey(nextApiKey);
    api.apiKey = nextApiKey;
  }

  function getGame() {
    api.getGame().then(resp => {
      console.info(`Get Game: `, resp);
    });
  }

  return (
    <>
      <Helmet title={'CurseForge 客户端测试'} />
      <Flex vertical>
        <Flex>
          <Input
            value={apiKey}
            onChange={e => changeApiKey(e.target.value)}
            placeholder={'API_KEY'}
          />
        </Flex>
        <Flex>
          <Button onClick={() => getGame()}>获取游戏信息</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Index;
