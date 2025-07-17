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
    title: "React + Node.js 풀스택 프로젝트 팀원 모집",
    content:
      "쇼핑몰 플랫폼을 개발할 팀원을 찾습니다. 실무 경험을 쌓고 싶은 분들 환영합니다.",
    stacks: ["React", "Node.js", "MongoDB", "TypeScript"],
    deadline: getDateString(30), // 30일 후
    memberCount: 3,
    author: "김개발",
    createdAt: getDateString(-5), // 5일 전 작성
    status: "recruiting",
    applicants: [mockApplicants[0], mockApplicants[1], mockApplicants[2]],
    applicationCount: 3,
  },
  {
    id: 2,
    title: "AI 챗봇 서비스 개발팀 모집",
    content: "OpenAI API를 활용한 챗봇 서비스를 개발할 팀원을 모집합니다.",
    stacks: ["Python", "FastAPI", "React", "OpenAI"],
    deadline: getDateString(5), // 5일 후 (마감임박)
    memberCount: 2,
    author: "박인공",
    createdAt: getDateString(-3), // 3일 전 작성
    status: "urgent",
    applicants: [mockApplicants[3]],
    applicationCount: 1,
  },
  {
    id: 3,
    title: "모바일 앱 개발 프로젝트",
    content: "React Native로 헬스케어 앱을 만들 팀원을 찾습니다.",
    stacks: ["React Native", "Firebase", "JavaScript"],
    deadline: getDateString(90), // 90일 후
    memberCount: 4,
    author: "이모바일",
    createdAt: getDateString(-1), // 1일 전 작성
    status: "recruiting",
    applicants: [mockApplicants[4]],
    applicationCount: 1,
  },
  {
    id: 4,
    title: "Vue 프론트엔드 개발자 모집",
    content: "스타트업에서 사용할 관리자 대시보드를 함께 만들어요!",
    stacks: ["Vue", "Nuxt.js", "TypeScript", "Tailwind"],
    deadline: getDateString(3), // 3일 후 (마감임박)
    memberCount: 2,
    author: "정프론트",
    createdAt: getDateString(-7), // 7일 전 작성
    status: "urgent",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 5,
    title: "백엔드 API 개발팀원 구함",
    content: "Spring으로 RESTful API를 개발할 팀원을 찾습니다.",
    stacks: ["Java", "Spring", "PostgreSQL", "Docker"],
    deadline: getDateString(45), // 45일 후
    memberCount: 3,
    author: "최백엔드",
    createdAt: getDateString(-2), // 2일 전 작성
    status: "recruiting",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 6,
    title: "완료된 프로젝트 - 더 이상 모집하지 않음",
    content: "이미 완료된 프로젝트입니다. 참고용으로 남겨둡니다.",
    stacks: ["React", "Express", "MongoDB"],
    deadline: getDateString(-10), // 10일 전 마감 (완료)
    memberCount: 4,
    author: "김완료",
    createdAt: getDateString(-30), // 30일 전 작성
    status: "completed",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 7,
    title: "Flutter 앱 개발 프로젝트",
    content: "크로스 플랫폼 앱을 개발할 팀원을 모집합니다. 초보자도 환영!",
    stacks: ["Flutter", "Firebase"],
    deadline: getDateString(1), // 내일 마감 (초급 마감임박)
    memberCount: 3,
    author: "박모바일",
    createdAt: getDateString(-14), // 14일 전 작성
    status: "urgent",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 8,
    title: "웹 디자인 + 프론트엔드 협업 프로젝트",
    content: "포트폴리오 사이트를 함께 만들어요. 디자이너와 개발자 모두 환영!",
    stacks: ["Figma", "React"],
    deadline: getDateString(60), // 60일 후
    memberCount: 2,
    author: "김디자인",
    createdAt: getDateString(-1), // 1일 전 작성
    status: "recruiting",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 9,
    title: "데이터 분석 스터디 그룹",
    content: "머신러닝과 데이터 분석을 함께 공부할 분들을 찾습니다.",
    stacks: ["Python", "Pandas"],
    deadline: getDateString(7), // 7일 후 (경계선)
    memberCount: 5,
    author: "이데이터",
    createdAt: getDateString(-4), // 4일 전 작성
    status: "recruiting",
    applicants: [],
    applicationCount: 0,
  },
  {
    id: 10,
    title: "게임 개발 팀원 모집 (Unity)",
    content:
      "인디 게임을 함께 만들어요! 게임 개발에 관심 있는 분들 지원해주세요.",
    stacks: ["Git", "C#"],
    deadline: getDateString(21), // 21일 후
    memberCount: 4,
    author: "최게임",
    createdAt: getDateString(-6), // 6일 전 작성
    status: "recruiting",
    applicants: [],
    applicationCount: 0,
  },
];
