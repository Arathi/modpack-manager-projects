export interface ModFile {
  id: number;
  gameId: number;
  modId: number;
  displayName: string;
  fileName: string;
  releaseType: number;
  hashes: Hashes[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  fileSizeOnDisk: number;
  downloadUrl: string;
  gameVersions: string[];
  dependencies: Dependency[];
  isServerPack: boolean;
  fileFingerprint: number;
  modules: Module[];
}

export interface Hashes {
  value: string;
  algo: number;
}

export interface Dependency {
  modId: number;
  relationType: number;
}

export interface Module {
  name: string;
  fingerprint: number;
}

export interface GetModFilesParameters {
  gameVersion?: string;
  modLoaderType?: number;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}
