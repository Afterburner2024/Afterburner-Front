// 사용자 프로필 관련 타입 정의
export interface User {
  userId: number;
  userName: string;
  userPhoneNumber?: string;
  userEmail: string;
  registeredAt: string;
  modifiedAt: string;
  deletedAt?: string;
  note?: string;
  userTechStacks: string[];
  userImage?: string;
  
  // 소셜 로그인 추가 정보
  githubUsername?: string;
  githubUrl?: string;
  blogUrl?: string;
  company?: string;
  location?: string;
  bio?: string;
  socialProvider?: 'github' | 'google' | 'kakao';
  
  // GitHub API에서 가져올 수 있는 추가 정보
  publicRepos?: number;
  followers?: number;
  following?: number;
  
  // 프로필 설정
  isPublic: boolean; // 프로필 공개 여부
  showEmail: boolean; // 이메일 공개 여부
  showPhone: boolean; // 전화번호 공개 여부
}

export interface UserStats {
  totalProjects: number;
  completedProjects: number;
  totalStudies: number;
  completedStudies: number;
  contributions: number;
  joinedAt: string;
}

export interface UserActivity {
  id: number;
  type: 'project_join' | 'project_complete' | 'study_join' | 'study_complete' | 'post_create';
  title: string;
  description: string;
  date: string;
  projectId?: number;
  studyId?: number;
}

export interface UserProject {
  id: number;
  title: string;
  description: string;
  status: 'recruiting' | 'in_progress' | 'completed';
  role: 'leader' | 'member';
  techStacks: string[];
  memberCount: number;
  startDate: string;
  endDate?: string;
  githubUrl?: string;
}

export interface ProfileEditForm {
  userName: string;
  bio?: string;
  company?: string;
  location?: string;
  blogUrl?: string;
  githubUsername?: string;
  userTechStacks: string[];
  isPublic: boolean;
  showEmail: boolean;
  showPhone: boolean;
} 