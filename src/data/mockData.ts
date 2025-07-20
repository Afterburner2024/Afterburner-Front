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
