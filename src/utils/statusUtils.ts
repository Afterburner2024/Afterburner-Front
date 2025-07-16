import { parseISO, isBefore, differenceInDays, isAfter } from "date-fns";
import { RecruitmentPost } from "@/types/recruitment";

export type DynamicStatus = "recruiting" | "urgent" | "completed";

/**
 * 현재 날짜를 기준으로 게시글의 상태를 동적으로 계산
 * @param post 모집 게시글
 * @param urgentDaysThreshold 마감 임박으로 처리할 일수 (기본값: 7일)
 * @returns 계산된 상태
 */
export const calculateDynamicStatus = (
  post: RecruitmentPost,
  urgentDaysThreshold: number = 7
): DynamicStatus => {
  const now = new Date();
  const deadline = parseISO(post.deadline);
  const daysUntilDeadline = differenceInDays(deadline, now);

  // 마감일이 지났으면 완료 처리
  if (isBefore(deadline, now)) {
    return "completed";
  }

  // 마감일이 임계값 이내이면 마감임박 처리
  if (daysUntilDeadline <= urgentDaysThreshold) {
    return "urgent";
  }

  // 그 외의 경우는 모집중
  return "recruiting";
};

/**
 * 게시글에 동적 상태를 적용한 새로운 객체 반환
 * @param post 원본 게시글
 * @param urgentDaysThreshold 마감 임박 임계값
 * @returns 동적 상태가 적용된 게시글
 */
export const applyDynamicStatus = (
  post: RecruitmentPost,
  urgentDaysThreshold: number = 7
): RecruitmentPost => {
  return {
    ...post,
    status: calculateDynamicStatus(post, urgentDaysThreshold),
  };
};

/**
 * 게시글 목록에 동적 상태를 일괄 적용
 * @param posts 게시글 목록
 * @param urgentDaysThreshold 마감 임박 임계값
 * @returns 동적 상태가 적용된 게시글 목록
 */
export const applyDynamicStatusToPosts = (
  posts: RecruitmentPost[],
  urgentDaysThreshold: number = 7
): RecruitmentPost[] => {
  return posts.map((post) => applyDynamicStatus(post, urgentDaysThreshold));
};

/**
 * D-Day 계산 (마감일까지 남은 일수)
 * @param deadline 마감일 문자열 (ISO format)
 * @returns 남은 일수 (음수면 마감일 지남)
 */
export const calculateDDay = (deadline: string): number => {
  const now = new Date();
  const deadlineDate = parseISO(deadline);
  return differenceInDays(deadlineDate, now);
};

/**
 * D-Day 표시용 문자열 생성
 * @param deadline 마감일 문자열
 * @returns D-Day 문자열 (예: "D-5", "D-Day", "마감")
 */
export const formatDDay = (deadline: string): string => {
  const dday = calculateDDay(deadline);

  if (dday < 0) {
    return "마감";
  } else if (dday === 0) {
    return "D-Day";
  } else {
    return `D-${dday}`;
  }
};

/**
 * 상태에 따른 한글 라벨 반환
 * @param status 상태
 * @returns 한글 상태 라벨
 */
export const getStatusLabel = (status: DynamicStatus): string => {
  switch (status) {
    case "recruiting":
      return "모집중";
    case "urgent":
      return "마감임박";
    case "completed":
      return "모집완료";
    default:
      return "모집중";
  }
};

/**
 * 상태에 따른 색상 클래스 반환
 * @param status 상태
 * @returns Tailwind CSS 색상 클래스
 */
export const getStatusColorClass = (status: DynamicStatus): string => {
  switch (status) {
    case "recruiting":
      return "bg-blue-600 dark:bg-blue-500 text-white";
    case "urgent":
      return "bg-red-600 dark:bg-red-500 text-white";
    case "completed":
      return "bg-gray-600 dark:bg-gray-500 text-white";
    default:
      return "bg-slate-600 dark:bg-slate-500 text-white";
  }
};
