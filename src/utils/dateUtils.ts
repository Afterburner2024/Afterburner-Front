// 마감일까지 남은 일수 계산
export const getDaysLeft = (deadline: string): number => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// 긴급도 판단
export const isUrgent = (daysLeft: number): boolean => {
  return daysLeft <= 7 && daysLeft >= 0;
};

// 만료 여부 판단
export const isExpired = (daysLeft: number): boolean => {
  return daysLeft < 0;
};
