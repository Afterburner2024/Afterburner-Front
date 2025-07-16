import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 모바일에서 "일" 제거하는 formatDay 함수
export const formatDay = (isMobile: boolean, date: Date) => {
  if (isMobile) {
    return format(date, "d", { locale: ko }); // 숫자만
  }
  return format(date, "d일", { locale: ko }); // 데스크톱에서는 "일" 포함
};

// 요일 표시 포맷팅 (모바일에서 짧게)
export const formatShortWeekday = (isMobile: boolean, date: Date) => {
  if (isMobile) {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[date.getDay()];
  }
  return format(date, "eee", { locale: ko }); // 월, 화, 수...
};

// 월/년 네비게이션 라벨 포맷팅
export const formatMonthYear = (isMobile: boolean, date: Date) => {
  if (isMobile) {
    return format(date, "yy.M", { locale: ko }); // 24.1 형태
  }
  return format(date, "yyyy년 M월", { locale: ko }); // 2024년 1월 형태
};

// 월 선택기 포맷팅
export const formatMonth = (isMobile: boolean, date: Date) => {
  if (isMobile) {
    return format(date, "M", { locale: ko }); // 1, 2, 3...
  }
  return format(date, "M월", { locale: ko }); // 1월, 2월, 3월...
};

// 년 선택기 포맷팅
export const formatYear = (isMobile: boolean, date: Date) => {
  if (isMobile) {
    return format(date, "yy", { locale: ko }); // 24, 25...
  }
  return format(date, "yyyy", { locale: ko }); // 2024, 2025...
};
