import { ModLoaderType } from './common';

interface File {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: FileReleaseType;
  fileStatus: FileStatus;
  hashes: FileHash[];
  fileDate: string;
  fileLength: bigint;
  downloadCount: bigint;
  fileSizeOnDisk?: bigint;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: SortableGameVersion[];
  dependencies: FileDependency[];
  exposeAsAlternative?: boolean;
  parentProjectFileId?: number;
  alternateFileId?: number;
  isServerPack?: boolean;
  serverPackFileId?: number;
  isEarlyAccessContent?: boolean;
  earlyAccessEndDate?: string;
  fileFingerprint: bigint;
  modules: FileModule[];
}

export enum FileStatus {
  Processing = 1,
  ChangesRequired = 2,
  UnderReview = 3,
  Approved = 4,
  Rejected = 5,
  MalwareDetected = 6,
  Deleted = 7,
  Archived = 8,
  Testing = 9,
  Released = 10,
  ReadyForReview = 11,
  Deprecated = 12,
  Baking = 13,
  AwaitingPublishing = 14,
  FailedPublishing = 15,
}

export interface FileHash {
  value: string;
  algo: HashAlgo;
}

export enum HashAlgo {
  Sha1 = 1,
  Md5 = 2,
}

export interface SortableGameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId?: number;
}

export interface FileDependency {
  modId: number;
  relationType: FileRelationType;
}

export enum FileRelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

export interface FileModule {
  name: string;
  fingerprint: bigint;
}

export interface FileIndex {
  gameVersion: string;
  fileId: number;
  filename: string;
  releaseType: FileReleaseType;
  gameVersionTypeId?: number;
  modLoader: ModLoaderType;
}

export enum FileReleaseType {
  Release = 1,
  Beta = 2,
  Alpha = 3,
}

export default File;
