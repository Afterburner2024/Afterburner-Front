export interface RecruitmentPost {
  id: number;
  title: string;
  content: string;
  stacks: string[];
  deadline: string;
  memberCount: number;
  author: string;
  createdAt: string;
  status?: "recruiting" | "urgent" | "completed";
  // 신청자 관련 필드 추가
  applicants?: Applicant[];
  applicationCount?: number;
}

// 신청자 정보 타입
export interface Applicant {
  id: number;
  introduction: string;
  appliedAt: string;
  avatar?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  status: "pending" | "accepted" | "rejected";
  // 사용자 정보는 별도 User 타입으로 관리 예정
  userId?: number;
}

export interface NewPostForm {
  title: string;
  content: string;
  stacks: string;
  deadline: string;
  memberCount: number;
}
