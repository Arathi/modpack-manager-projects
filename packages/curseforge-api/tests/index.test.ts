import CurseForgeApi from '@/curseforge-api';
import 'dotenv/config';

// describe('Default cases', () => {
//   test('hello world test', () => {
//     const s = 'hello Modern.js';
//     expect(s).toBe('hello Modern.js');
//   });
// });

const API_KEY = process.env.CURSEFORGE_API_KEY;

describe('CurseForge API 测试', () => {
  const api = new CurseForgeApi({ apiKey: API_KEY });
  test('Get Game', async () => {
    const resp = await api.getGame();
    console.info(`获取游戏信息，响应报文如下：`, resp);
  });
});
