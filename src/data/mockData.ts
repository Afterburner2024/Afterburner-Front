import { RecruitmentPost, Applicant } from "@/types/recruitment";

// 현재 날짜를 기준으로 상대적인 날짜 계산
const getDateString = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

// 목 신청자 데이터
const mockApplicants: Applicant[] = [
  {
    id: 1,
    introduction:
      "React와 Node.js에 관심이 많은 개발자입니다. 실무 경험을 쌓고 싶어요!",
    appliedAt: getDateString(-2),
    avatar: "/images/avatar1.png",
    githubUrl: "https://github.com/kimsincheong",
    portfolioUrl: "https://kimsincheng.dev",
    skills: ["React", "JavaScript", "CSS"],
    status: "pending",
    userId: 1,
  },
  {
    id: 2,
    introduction: "백엔드 개발에 관심이 있고, TypeScript 경험이 있습니다.",
    appliedAt: getDateString(-1),
    githubUrl: "https://github.com/parkjiwon",
    skills: ["Node.js", "TypeScript", "MongoDB"],
    status: "accepted",
    userId: 2,
  },
  {
    id: 3,
    introduction:
      "풀스택 개발자로 성장하고 싶습니다. 열정만큼은 누구에게도 지지 않아요!",
    appliedAt: getDateString(-3),
    skills: ["JavaScript", "React"],
    status: "pending",
    userId: 3,
  },
  {
    id: 4,
    introduction:
      "AI에 관심이 많은 신입 개발자입니다. 함께 성장했으면 좋겠어요.",
    appliedAt: getDateString(-1),
    githubUrl: "https://github.com/choicoding",
    skills: ["Python", "FastAPI", "OpenAI"],
    status: "pending",
    userId: 4,
  },
  {
    id: 5,
    introduction:
      "모바일 앱 개발 경험이 있습니다. React Native로 좋은 앱을 만들어보고 싶어요.",
    appliedAt: getDateString(-1),
    skills: ["React Native", "JavaScript", "Firebase"],
    status: "pending",
    userId: 5,
  },
];

// 기술 스택 트렌드 데이터
export const techTrends = [
  { name: "React", percentage: 85, change: "+5%" },
  { name: "TypeScript", percentage: 78, change: "+12%" },
  { name: "Next.js", percentage: 65, change: "+8%" },
  { name: "Python", percentage: 58, change: "+3%" },
  { name: "Node.js", percentage: 52, change: "+7%" },
  { name: "Vue", percentage: 45, change: "-2%" },
  { name: "Flutter", percentage: 38, change: "+15%" },
  { name: "Go", percentage: 32, change: "+9%" },
];

// 최신 기술 컬럼 데이터 (스크래핑 시뮬레이션)
export const techArticles = [
  {
    id: 1,
    title: "React 19의 새로운 기능들: Concurrent Features와 성능 최적화",
    summary:
      "React 19에서 도입된 새로운 동시성 기능과 자동 배칭, Suspense 개선사항을 살펴봅니다.",
    author: "Meta Engineering",
    publishedAt: "2024-01-15",
    source: "React Blog",
    tags: ["React", "Performance", "Concurrent"],
    readTime: "5분",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
    category: "Frontend",
  },
  {
    id: 2,
    title: "TypeScript 5.3 릴리즈: Import Attributes와 새로운 타입 기능",
    summary:
      "TypeScript 5.3의 주요 업데이트인 Import Attributes와 향상된 타입 추론을 알아봅니다.",
    author: "TypeScript Team",
    publishedAt: "2024-01-12",
    source: "TypeScript Blog",
    tags: ["TypeScript", "JavaScript", "Developer Tools"],
    readTime: "4분",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=300&fit=crop",
    category: "Language",
  },
  {
    id: 3,
    title: "Next.js App Router 완전 정복: 마이그레이션 가이드",
    summary:
      "Pages Router에서 App Router로 마이그레이션하는 완벽한 가이드와 베스트 프랙티스를 제공합니다.",
    author: "Vercel Team",
    publishedAt: "2024-01-10",
    source: "Next.js Docs",
    tags: ["Next.js", "React", "Migration"],
    readTime: "8분",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop",
    category: "Framework",
  },
  {
    id: 4,
    title: "AI와 개발자: GitHub Copilot의 진화와 개발 생산성",
    summary:
      "AI 도구가 개발자의 업무에 미치는 영향과 GitHub Copilot의 최신 기능들을 살펴봅니다.",
    author: "GitHub Team",
    publishedAt: "2024-01-08",
    source: "GitHub Blog",
    tags: ["AI", "GitHub", "Productivity"],
    readTime: "6분",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    category: "AI",
  },
  {
    id: 5,
    title: "웹 성능 최적화: Core Web Vitals 2024 업데이트",
    summary:
      "Google의 Core Web Vitals 지표 변경사항과 웹 성능 최적화 전략을 다룹니다.",
    author: "Google Web Team",
    publishedAt: "2024-01-05",
    source: "Web.dev",
    tags: ["Performance", "Web Vitals", "SEO"],
    readTime: "7분",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    category: "Performance",
  },
  {
    id: 6,
    title: "Docker와 Kubernetes: 2024년 컨테이너 생태계 전망",
    summary:
      "컨테이너 기술의 최신 동향과 DevOps 환경에서의 실용적인 적용 방안을 제시합니다.",
    author: "CNCF Community",
    publishedAt: "2024-01-03",
    source: "CNCF Blog",
    tags: ["Docker", "Kubernetes", "DevOps"],
    readTime: "9분",
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=300&fit=crop",
    category: "DevOps",
  },
];

// 이달의 개발자 데이터
export const monthlyDevelopers = [
  {
    id: 1,
    name: "김개발",
    role: "풀스택 개발자",
    avatar: "/images/avatar1.png",
    achievements: ["3개 프로젝트 완료", "15명 멘토링", "React 전문가"],
    mainStacks: ["React", "Node.js", "TypeScript"],
    githubUrl: "https://github.com/kimdev",
    projects: 8,
    mentoring: 15,
  },
  {
    id: 2,
    name: "박AI",
    role: "AI/ML 엔지니어",
    avatar: "/images/avatar2.png",
    achievements: ["AI 스터디 운영", "오픈소스 기여", "논문 2편 발표"],
    mainStacks: ["Python", "TensorFlow", "PyTorch"],
    githubUrl: "https://github.com/parkai",
    projects: 5,
    mentoring: 12,
  },
  {
    id: 3,
    name: "이모바일",
    role: "모바일 개발자",
    avatar: "/images/avatar3.png",
    achievements: [
      "앱스토어 출시",
      "Flutter 커뮤니티 활동",
      "기술 블로그 운영",
    ],
    mainStacks: ["Flutter", "React Native", "Swift"],
    githubUrl: "https://github.com/leemobile",
    projects: 6,
    mentoring: 8,
  },
];

export const mockPosts: RecruitmentPost[] = [
  {
    id: 1,
    title: "React 개인 프로젝트 팀원 모집 🚀",
    content:
      "개인적으로 React를 사용한 웹 서비스를 개발하고 있습니다. 함께 참여하실 분들을 찾고 있어요! 주로 프론트엔드 개발이 메인이지만, 백엔드도 조금씩 건드려볼 예정입니다.",
    stacks: ["React", "TypeScript", "Node.js", "MongoDB"],
    deadline: getDateString(14),
    memberCount: 3,
    author: "김개발",
    createdAt: getDateString(-5),
    type: "project",
    applicants: mockApplicants.slice(0, 3),
    applicationCount: 3,
  },
  {
    id: 2,
    title: "AI 챗봇 프로젝트 개발자 모집",
    content:
      "OpenAI API를 활용한 챗봇 서비스를 개발하고 있습니다. Python과 FastAPI에 관심있는 분들 함께해요!",
    stacks: ["Python", "FastAPI", "OpenAI", "Docker"],
    deadline: getDateString(21),
    memberCount: 2,
    author: "박인공",
    createdAt: getDateString(-3),
    type: "project",
    applicants: mockApplicants.slice(1, 3),
    applicationCount: 2,
  },
  {
    id: 3,
    title: "JavaScript 알고리즘 스터디 모집",
    content:
      "프로그래머스와 백준 문제를 JavaScript로 풀어보는 스터디입니다. 주 2회 온라인으로 진행하며, 코드 리뷰와 함께 진행할 예정입니다.",
    stacks: ["JavaScript", "Algorithm"],
    deadline: getDateString(7),
    memberCount: 4,
    author: "이스터디",
    createdAt: getDateString(-2),
    type: "study",
    applicants: mockApplicants.slice(0, 2),
    applicationCount: 2,
  },
  {
    id: 4,
    title: "풀스택 개발 스터디 그룹",
    content:
      "React + Node.js를 활용한 풀스택 개발을 함께 학습할 스터디원을 모집합니다. 초보자 환영!",
    stacks: ["React", "Node.js", "Express", "PostgreSQL"],
    deadline: getDateString(10),
    memberCount: 5,
    author: "최풀스택",
    createdAt: getDateString(-1),
    type: "study",
    applicants: mockApplicants.slice(2, 4),
    applicationCount: 2,
  },
  {
    id: 5,
    title: "모바일 앱 개발 프로젝트 팀원 구함",
    content:
      "React Native를 사용한 크로스플랫폼 모바일 앱을 개발하고 있습니다. 디자이너와 개발자 모두 환영합니다!",
    stacks: ["React Native", "TypeScript", "Firebase"],
    deadline: getDateString(30),
    memberCount: 4,
    author: "앱개발자",
    createdAt: getDateString(-7),
    type: "project",
    applicants: mockApplicants.slice(0, 1),
    applicationCount: 1,
  },
  {
    id: 6,
    title: "웹 디자인 시스템 구축 프로젝트",
    content:
      "회사에서 사용할 디자인 시스템을 구축하는 프로젝트입니다. Storybook과 Figma를 활용할 예정입니다.",
    stacks: ["Storybook", "Figma", "CSS", "Design System"],
    deadline: getDateString(2),
    memberCount: 2,
    author: "디자인러",
    createdAt: getDateString(-10),
    type: "project",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 7,
    title: "CS 기초 스터디 (자료구조/알고리즘)",
    content:
      "컴퓨터 과학 기초를 다지는 스터디입니다. 자료구조와 알고리즘을 중심으로 진행하며, 매주 발표와 토론을 진행합니다.",
    stacks: ["Algorithm", "Data Structure", "Computer Science"],
    deadline: getDateString(5),
    memberCount: 6,
    author: "김컴공",
    createdAt: getDateString(-4),
    type: "study",
    applicants: mockApplicants.slice(1, 4),
    applicationCount: 3,
  },
  {
    id: 8,
    title: "블록체인 DApp 개발 프로젝트",
    content:
      "Ethereum 기반의 탈중앙화 애플리케이션을 개발하는 프로젝트입니다. Solidity와 Web3.js 경험자 우대합니다.",
    stacks: ["Solidity", "Web3.js", "Ethereum", "React"],
    deadline: getDateString(45),
    memberCount: 3,
    author: "블록체인러",
    createdAt: getDateString(-6),
    type: "project",
    applicants: mockApplicants.slice(0, 2),
    applicationCount: 2,
  },
];
