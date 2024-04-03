import 'dotenv/config';
import CurseForgeApi, {
  CLASS_ID_MODS,
  GAME_ID_MINECRAFT,
} from './curseforge-api';
import { ModLoaderType } from '@/schema';

const API_KEY = process.env.API_KEY ?? '';

describe('CurseForge API 测试', () => {
  const api = new CurseForgeApi({ apiKey: API_KEY });

  // #region Game
  test('Get Game', async () => {
    const resp = await api.getGame();
    const game = resp.data;
    expect(game.name).toBe('Minecraft');
  });

  test('Get Versions', async () => {
    const resp = await api.getVersions();
    const versions = resp.data;
    const mc120x = versions.find(mv => mv.versions.find(v => v === '1.20.1'));
    expect(mc120x?.type).toBe(75125);
  });

  test('Get Version Types', async () => {
    const resp = await api.getVersionTypes();
    const versionTypes = resp.data;
    const mc120x = versionTypes.find(vt => vt.name === 'Minecraft 1.20');
    expect(mc120x?.id).toBe(75125);
  });
  // #endregion

  // #region Categories
  test('Get Categories', async () => {
    const resp = await api.getCategories({});
    const categories = resp.data;
    const libraryApi = categories.find(cat => cat.slug === 'library-api');
    expect(libraryApi?.id).toBe(421);
  });
  // #endregion

  // #region Mods
  test('Search Mods', async () => {
    const resp = await api.searchMods({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MODS,
      slug: `jei`,
    });
    const { pagination, data } = resp;
    expect(pagination.totalCount).toBe(1);
    expect(data.length).toBe(1);
    const jei = data[0];
    expect(jei.id).toBe(238222);
    expect(jei.name).toBe('Just Enough Items (JEI)');
  });

  test('Get Mod', async () => {
    const resp = await api.getMod(238222);
    const jei = resp.data;
    expect(jei.slug).toBe('jei');
    expect(jei.name).toBe('Just Enough Items (JEI)');
  });

  test('Get Mods', async () => {
    const resp = await api.getMods({
      modIds: [238222, 248787],
    });
    const mods = resp.data;
    expect(mods.length).toBe(2);

    const jei = mods.find(mod => mod.slug === 'jei');
    expect(jei?.name).toBe('Just Enough Items (JEI)');
    expect(jei?.summary).toBe('View Items and Recipes');

    const appleskin = mods.find(mod => mod.slug === 'appleskin');
    expect(appleskin?.name).toBe('AppleSkin');
    expect(appleskin?.summary).toBe(
      'Adds some useful information about food/hunger to the HUD',
    );
  });
  // #endregion

  // #region Files
  test('Get Mod File', async () => {
    const resp = await api.getModFile(238222, 5101366);
    const file = resp.data;
    expect(file?.fileName).toBe('jei-1.20.1-forge-15.3.0.4.jar');
    expect(file?.downloadUrl).toBe(
      'https://edge.forgecdn.net/files/5101/366/jei-1.20.1-forge-15.3.0.4.jar',
    );
  });

  test('Get Mod Files', async () => {
    const resp = await api.getModFiles(238222, {
      gameVersion: '1.20.1',
      modLoaderType: ModLoaderType.Forge,
    });
    const files = resp.data;
    const jei15304 = files.find(
      f => f.fileName === 'jei-1.20.1-forge-15.3.0.4.jar',
    );
    expect(jei15304?.id).toBe(5101366);
  });
  // #endregion

  // #region Minecraft
  test('Get Minecraft Versions', async () => {
    const resp = await api.getMinecraftVersions();
    const versions = resp.data;
    const mc1201 = versions.find(v => v.versionString === '1.20.1');
    expect(mc1201?.id).toBe(82);
    expect(mc1201?.gameVersionId).toBe(9990);
    expect(mc1201?.gameVersionTypeId).toBe(75125);
  });

  test('Get Specific Minecraft Version', async () => {
    const resp = await api.getSpecificMinecraftVersion('1.20.1');
    const mc1201 = resp.data;
    expect(mc1201?.id).toBe(82);
    expect(mc1201?.gameVersionId).toBe(9990);
    expect(mc1201?.gameVersionTypeId).toBe(75125);
  });
  // #endregion
});
