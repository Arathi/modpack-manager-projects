export interface SearchModsConditions {
  gameId: number;
  classId: number | undefined;
  categoryIds: number[] | undefined;
  gameVersions: string[] | undefined;
}

export { ModLoaderType } from './common';
export {} from './requests';
export type { DataResponse } from './responses';
