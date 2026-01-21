import type { Source } from "./source";

export interface ModFile {
  source: Source;
  id: string;
  name: string;
  hashes: Record<string, string>;
  releaseDate: number;
  length: number;
  url: string;
  dependencies: Dependency[];
}

interface Dependency {
  modId: string;
  fileId?: string;
  type: DependencyType;
}

export enum DependencyType {
  Required = "required",
  Optional = "optional",
}
