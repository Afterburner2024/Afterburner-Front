import { User, UserStats, UserActivity, UserProject } from "@/types/user";

// 목 사용자 데이터
export const mockUsers: User[] = [
  {
    userId: 1,
    userName: "김개발",
    userEmail: "kim.dev@example.com",
    userPhoneNumber: "010-1234-5678",
    registeredAt: "2024-01-15T09:00:00Z",
    modifiedAt: "2024-01-20T14:30:00Z",
    userTechStacks: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    userImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    githubUsername: "kimdev123",
    githubUrl: "https://github.com/kimdev123",
    blogUrl: "https://kimdev.blog",
    company: "테크스타트업",
    location: "서울, 대한민국",
    bio: "풀스택 개발자입니다. 새로운 기술에 관심이 많고 팀워크를 중시합니다.",
    socialProvider: "github",
    publicRepos: 42,
    followers: 156,
    following: 89,
    isPublic: true,
    showEmail: true,
    showPhone: false,
  },
  {
    userId: 2,
    userName: "박프론트",
    userEmail: "park.frontend@example.com",
    registeredAt: "2024-01-10T10:00:00Z",
    modifiedAt: "2024-01-18T16:45:00Z",
    userTechStacks: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    userImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    githubUsername: "parkfrontend",
    githubUrl: "https://github.com/parkfrontend",
    company: "디자인에이전시",
    location: "부산, 대한민국",
    bio: "사용자 경험을 중시하는 프론트엔드 개발자입니다.",
    socialProvider: "github",
    publicRepos: 28,
    followers: 89,
    following: 134,
    isPublic: true,
    showEmail: false,
    showPhone: false,
  },
  {
    userId: 3,
    userName: "이백엔드",
    userEmail: "lee.backend@example.com",
    registeredAt: "2024-01-05T11:00:00Z",
    modifiedAt: "2024-01-19T13:20:00Z",
    userTechStacks: ["Java", "Spring Boot", "MySQL", "Docker", "Kubernetes"],
    userImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    githubUsername: "leebackend",
    githubUrl: "https://github.com/leebackend",
    blogUrl: "https://leebackend.tistory.com",
    company: "핀테크기업",
    location: "경기도, 대한민국",
    bio: "안정적이고 확장 가능한 백엔드 시스템을 구축합니다.",
    socialProvider: "google",
    publicRepos: 35,
    followers: 203,
    following: 67,
    isPublic: true,
    showEmail: true,
    showPhone: true,
  },
];

// 사용자 통계 데이터
export const mockUserStats: { [key: number]: UserStats } = {
  1: {
    totalProjects: 8,
    completedProjects: 5,
    totalStudies: 3,
    completedStudies: 2,
    contributions: 127,
    joinedAt: "2024-01-15",
  },
  2: {
    totalProjects: 6,
    completedProjects: 4,
    totalStudies: 4,
    completedStudies: 3,
    contributions: 89,
    joinedAt: "2024-01-10",
  },
  3: {
    totalProjects: 12,
    completedProjects: 8,
    totalStudies: 2,
    completedStudies: 1,
    contributions: 156,
    joinedAt: "2024-01-05",
  },
};

// 사용자 활동 데이터
export const mockUserActivities: { [key: number]: UserActivity[] } = {
  1: [
    {
      id: 1,
      type: "project_join",
      title: "웹 쇼핑몰 개발 프로젝트",
      description: "팀원으로 참여하여 프론트엔드 개발을 담당했습니다.",
      date: "2024-01-20",
      projectId: 1,
    },
    {
      id: 2,
      type: "study_complete",
      title: "React 심화 스터디",
      description: "6주간의 React 심화 스터디를 완료했습니다.",
      date: "2024-01-18",
      studyId: 1,
    },
    {
      id: 3,
      type: "post_create",
      title: "TypeScript 프로젝트 팀원 모집",
      description: "새로운 모집글을 작성했습니다.",
      date: "2024-01-15",
    },
  ],
  2: [
    {
      id: 4,
      type: "project_complete",
      title: "모바일 앱 UI/UX 개선",
      description: "프로젝트 리더로서 성공적으로 완료했습니다.",
      date: "2024-01-19",
      projectId: 2,
    },
    {
      id: 5,
      type: "study_join",
      title: "디자인 시스템 스터디",
      description: "디자인 시스템 스터디에 참여했습니다.",
      date: "2024-01-16",
      studyId: 2,
    },
  ],
  3: [
    {
      id: 6,
      type: "project_join",
      title: "마이크로서비스 아키텍처 구축",
      description: "백엔드 아키텍트로 참여했습니다.",
      date: "2024-01-21",
      projectId: 3,
    },
    {
      id: 7,
      type: "project_complete",
      title: "API 게이트웨이 개발",
      description: "API 게이트웨이 프로젝트를 성공적으로 완료했습니다.",
      date: "2024-01-17",
      projectId: 4,
    },
  ],
};

// 사용자 프로젝트 데이터
export const mockUserProjects: { [key: number]: UserProject[] } = {
  1: [
    {
      id: 1,
      title: "웹 쇼핑몰 개발",
      description: "React와 Node.js를 활용한 풀스택 쇼핑몰 프로젝트",
      status: "in_progress",
      role: "member",
      techStacks: ["React", "Node.js", "MongoDB"],
      memberCount: 4,
      startDate: "2024-01-15",
      githubUrl: "https://github.com/team/shopping-mall",
    },
    {
      id: 2,
      title: "포트폴리오 웹사이트",
      description: "개인 포트폴리오 웹사이트 제작",
      status: "completed",
      role: "leader",
      techStacks: ["Next.js", "TypeScript", "Tailwind CSS"],
      memberCount: 1,
      startDate: "2023-12-01",
      endDate: "2024-01-05",
      githubUrl: "https://github.com/kimdev123/portfolio",
    },
  ],
  2: [
    {
      id: 3,
      title: "모바일 앱 UI/UX 개선",
      description: "기존 앱의 사용자 경험 개선 프로젝트",
      status: "completed",
      role: "leader",
      techStacks: ["React Native", "Figma", "TypeScript"],
      memberCount: 3,
      startDate: "2023-12-15",
      endDate: "2024-01-19",
    },
  ],
  3: [
    {
      id: 4,
      title: "마이크로서비스 아키텍처",
      description: "기존 모놀리식 서비스를 마이크로서비스로 전환",
      status: "in_progress",
      role: "leader",
      techStacks: ["Java", "Spring Boot", "Docker", "Kubernetes"],
      memberCount: 5,
      startDate: "2024-01-10",
      githubUrl: "https://github.com/team/microservices",
    },
    {
      id: 5,
      title: "API 게이트웨이 개발",
      description: "마이크로서비스용 API 게이트웨이 구축",
      status: "completed",
      role: "leader",
      techStacks: ["Java", "Spring Cloud Gateway", "Redis"],
      memberCount: 2,
      startDate: "2023-12-01",
      endDate: "2024-01-17",
      githubUrl: "https://github.com/leebackend/api-gateway",
    },
  ],
};
