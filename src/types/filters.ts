export type SortOption = "latest" | "deadline" | "members" | "popular";
export type StatusFilter = "all" | "recruiting" | "urgent" | "completed";
export type DateFilter = "all" | "thisWeek" | "thisMonth" | "urgent";

export interface FilterState {
  search: string;
  techStacks: string[];
  status: StatusFilter;
  dateFilter: DateFilter;
  sortBy: SortOption;
}

export interface FilterOptions {
  availableTechStacks: string[];
  statusOptions: { value: StatusFilter; label: string }[];
  dateOptions: { value: DateFilter; label: string }[];
  sortOptions: { value: SortOption; label: string }[];
}
