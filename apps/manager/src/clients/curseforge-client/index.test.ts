import 'dotenv/config';
import CurseForgeClient from '.';

const CURSEFORGE_API_KEY = process.env.CURSEFORGE_API_KEY ?? '';

const client = new CurseForgeClient(CURSEFORGE_API_KEY);

describe('CurseForge Client', () => {
  test('getCategories()', async () => {
    const categories = await client.getCategories();
    const storage = categories.find(cat => cat.slug === 'storage');
    expect(storage?.id).toBe(420);
  });
});
