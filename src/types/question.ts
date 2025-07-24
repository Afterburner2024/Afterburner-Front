export interface QuestionPost {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorId: number;
  createdAt: string;
  updatedAt?: string;
  status: "open" | "resolved" | "closed";
  viewCount: number;
  answerCount: number;
  isSolved: boolean;
  acceptedAnswerId?: number;
  // 추가 필드
  difficulty?: "beginner" | "intermediate" | "advanced";
  priority?: "low" | "medium" | "high";
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  authorId: number;
  createdAt: string;
  updatedAt?: string;
  isAccepted: boolean;
  voteCount: number;
  questionId: number;
}

export interface QuestionForm {
  title: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  priority: "low" | "medium" | "high";
}

export interface QuestionFilters {
  category: string;
  status: string;
  difficulty?: string;
  priority?: string;
}

export const questionCategories = [
  { value: "all", label: "전체" },
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "database", label: "데이터베이스" },
  { value: "devops", label: "DevOps" },
  { value: "algorithm", label: "알고리즘" },
  { value: "framework", label: "프레임워크" },
  { value: "library", label: "라이브러리" },
  { value: "deployment", label: "배포" },
  { value: "testing", label: "테스팅" },
  { value: "other", label: "기타" },
];

export const questionStatuses = [
  { value: "all", label: "전체" },
  { value: "open", label: "답변 대기" },
  { value: "resolved", label: "해결됨" },
  { value: "closed", label: "마감됨" },
];

export const questionDifficulties = [
  { value: "all", label: "전체" },
  { value: "beginner", label: "초급" },
  { value: "intermediate", label: "중급" },
  { value: "advanced", label: "고급" },
];

export const questionPriorities = [
  { value: "all", label: "전체" },
  { value: "low", label: "낮음" },
  { value: "medium", label: "보통" },
  { value: "high", label: "높음" },
];
