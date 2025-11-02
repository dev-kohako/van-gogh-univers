import { Painting } from "./types";

export type SortOrder = "asc" | "desc";
export type SortBy = "name" | "date";

export interface UsePaintingsProps {
  paintings: Painting[];
  initialItemsPerPage?: number;
}
