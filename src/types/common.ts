export type ProjectType = "project" | "study";

export interface WithTimestamps {
  createdAt: string;
  updatedAt?: string;
}
