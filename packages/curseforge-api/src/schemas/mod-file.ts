export interface ModFile {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: number;
  fileStatus: number;
  hashes: Digest[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  fileSizeOnDisk: number;
  downloadUrl: string;
  gameVersions: string[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sortableGameVersions: any[];
  dependencies: Dependency[];
  alternateFileId: number;
  isServerPack: boolean;
  fileFingerprint: number;
  modules: Module[];
}

interface Digest {
  value: string;
  algo: HashAlgorithm;
}

export enum HashAlgorithm {
  SHA1 = 1,
  MD5 = 2,
}

interface Dependency {
  modId: number;
  relationType: RelationType;
}

export enum RelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

interface Module {
  name: string;
  fingerprint: number;
}
