export interface IUrl {
  original: string;
  shortCode: string;
  password?: string;
  numOfClicks: number;
  lastClickedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
