export default interface Game {
  id: number;
  name: string;
  slug: string;
  dateModified: string;
  assets: GameAssets;
  status: CoreStatus;
  apiStatus: CoreApiStatus;
}

export interface GameAssets {
  iconUrl: string;
  titleUrl: string;
  coverUrl: string;
}

export enum CoreStatus {
  Draft = 1,
  Test = 2,
  PendingReview = 3,
  Rejected = 4,
  Approved = 5,
  Live = 6,
}

export enum CoreApiStatus {
  Private = 1,
  Public = 2,
}
