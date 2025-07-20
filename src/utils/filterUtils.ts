import { RecruitmentPost } from "@/types/recruitment";
import {
  FilterState,
  SortOption,
  StatusFilter,
  DateFilter,
  TypeFilter,
} from "@/types/filters";
import {
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isBefore,
  addDays,
  parseISO,
} from "date-fns";
import { calculateDynamicStatus } from "./statusUtils";

// 검색 필터링
export const filterBySearch = (
  posts: RecruitmentPost[],
  search: string
): RecruitmentPost[] => {
  if (!search.trim()) return posts;

  const searchLower = search.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.author.toLowerCase().includes(searchLower)
  );
};

// 기술 스택 필터링
export const filterByTechStacks = (
  posts: RecruitmentPost[],
  techStacks: string[]
): RecruitmentPost[] => {
  if (techStacks.length === 0) return posts;

  return posts.filter((post) =>
    techStacks.every((tech) =>
      post.stacks.some((postTech: string) =>
        postTech.toLowerCase().includes(tech.toLowerCase())
      )
    )
  );
};

// 타입별 필터링 (프로젝트/스터디)
export const filterByType = (
  posts: RecruitmentPost[],
  typeFilter: TypeFilter
): RecruitmentPost[] => {
  if (typeFilter === "all") return posts;
  return posts.filter((post) => post.type === typeFilter);
};

// 상태별 필터링 (동적 상태 계산)
export const filterByStatus = (
  posts: RecruitmentPost[],
  status: StatusFilter
): RecruitmentPost[] => {
  if (status === "all") return posts;
  return posts.filter((post) => {
    const dynamicStatus = calculateDynamicStatus(post);
    return dynamicStatus === status;
  });
};

// 날짜별 필터링
export const filterByDate = (
  posts: RecruitmentPost[],
  dateFilter: DateFilter
): RecruitmentPost[] => {
  if (dateFilter === "all") return posts;

  const now = new Date();

  switch (dateFilter) {
    case "thisWeek":
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // 월요일 시작
      const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
      return posts.filter((post) => {
        const deadline = parseISO(post.deadline);
        return isWithinInterval(deadline, { start: weekStart, end: weekEnd });
      });

    case "thisMonth":
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
      return posts.filter((post) => {
        const deadline = parseISO(post.deadline);
        return isWithinInterval(deadline, { start: monthStart, end: monthEnd });
      });

    case "urgent":
      const urgentLimit = addDays(now, 7); // 일주일 이내
      return posts.filter((post) => {
        const deadline = parseISO(post.deadline);
        const dynamicStatus = calculateDynamicStatus(post);
        return isBefore(deadline, urgentLimit) && dynamicStatus === "urgent";
      });

    default:
      return posts;
  }
};

// 정렬 함수
export const sortPosts = (
  posts: RecruitmentPost[],
  sortBy: SortOption
): RecruitmentPost[] => {
  const sorted = [...posts];

  switch (sortBy) {
    case "latest":
      return sorted.sort((a, b) => {
        const dateA = parseISO(a.createdAt);
        const dateB = parseISO(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

    case "deadline":
      return sorted.sort((a, b) => {
        const dateA = parseISO(a.deadline);
        const dateB = parseISO(b.deadline);
        return dateA.getTime() - dateB.getTime();
      });

    case "members":
      return sorted.sort((a, b) => a.memberCount - b.memberCount);

    case "popular":
      // 예시: 댓글 수, 조회수 등으로 정렬 (현재는 최신순으로 대체)
      return sorted.sort((a, b) => {
        const dateA = parseISO(a.createdAt);
        const dateB = parseISO(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

    default:
      return sorted;
  }
};

// 전체 필터링 적용
export const applyFilters = (
  posts: RecruitmentPost[],
  filters: FilterState
): RecruitmentPost[] => {
  let filteredPosts = posts;

  // 순차적으로 필터 적용
  filteredPosts = filterBySearch(filteredPosts, filters.search);
  filteredPosts = filterByTechStacks(filteredPosts, filters.techStacks);
  filteredPosts = filterByType(filteredPosts, filters.typeFilter);
  filteredPosts = filterByStatus(filteredPosts, filters.status);
  filteredPosts = filterByDate(filteredPosts, filters.dateFilter);

  // 마지막에 정렬 적용
  return sortPosts(filteredPosts, filters.sortBy);
};

// 모든 기술 스택 추출
export const extractAllTechStacks = (posts: RecruitmentPost[]): string[] => {
  const allTechStacks = posts.flatMap((post) => post.stacks);
  return Array.from(new Set(allTechStacks)).sort();
};
