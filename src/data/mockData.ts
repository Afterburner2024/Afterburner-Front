import { RecruitmentPost } from "@/types/recruitment";

// 현재 날짜를 기준으로 상대적인 날짜 계산
const getDateString = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
};

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
  },
  {
    id: 4,
    title: "Vue.js 프론트엔드 개발자 모집",
    content: "스타트업에서 사용할 관리자 대시보드를 함께 만들어요!",
    stacks: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"],
    deadline: getDateString(3), // 3일 후 (마감임박)
    memberCount: 2,
    author: "정프론트",
    createdAt: getDateString(-7), // 7일 전 작성
    status: "urgent",
  },
  {
    id: 5,
    title: "백엔드 API 개발팀원 구함",
    content: "Spring Boot로 RESTful API를 개발할 팀원을 찾습니다.",
    stacks: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    deadline: getDateString(45), // 45일 후
    memberCount: 3,
    author: "최백엔드",
    createdAt: getDateString(-2), // 2일 전 작성
    status: "recruiting",
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
  },
  {
    id: 7,
    title: "Flutter 앱 개발 프로젝트",
    content: "크로스 플랫폼 앱을 개발할 팀원을 모집합니다. 초보자도 환영!",
    stacks: ["Flutter", "Dart", "Firebase", "SQLite"],
    deadline: getDateString(1), // 내일 마감 (초급 마감임박)
    memberCount: 3,
    author: "박모바일",
    createdAt: getDateString(-14), // 14일 전 작성
    status: "urgent",
  },
  {
    id: 8,
    title: "웹 디자인 + 프론트엔드 협업 프로젝트",
    content: "포트폴리오 사이트를 함께 만들어요. 디자이너와 개발자 모두 환영!",
    stacks: ["Figma", "React", "Styled-components", "Framer Motion"],
    deadline: getDateString(60), // 60일 후
    memberCount: 2,
    author: "김디자인",
    createdAt: getDateString(-1), // 1일 전 작성
    status: "recruiting",
  },
  {
    id: 9,
    title: "데이터 분석 스터디 그룹",
    content: "머신러닝과 데이터 분석을 함께 공부할 분들을 찾습니다.",
    stacks: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
    deadline: getDateString(7), // 7일 후 (경계선)
    memberCount: 5,
    author: "이데이터",
    createdAt: getDateString(-4), // 4일 전 작성
    status: "recruiting",
  },
  {
    id: 10,
    title: "게임 개발 팀원 모집 (Unity)",
    content:
      "인디 게임을 함께 만들어요! 게임 개발에 관심 있는 분들 지원해주세요.",
    stacks: ["Unity", "C#", "Blender", "Git"],
    deadline: getDateString(21), // 21일 후
    memberCount: 4,
    author: "최게임",
    createdAt: getDateString(-6), // 6일 전 작성
    status: "recruiting",
  },
];
