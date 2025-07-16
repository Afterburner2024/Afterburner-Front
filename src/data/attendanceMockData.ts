import { Comment } from "@/types/attendance";

export const initialComments: Comment[] = [
  {
    id: 1,
    user: "김개발",
    content: "오늘도 화이팅! 🔥",
    timestamp: new Date("2024-01-15T09:30:00"),
  },
  {
    id: 2,
    user: "박코딩",
    avatar: "/api/placeholder/32/32",
    content: "새로운 프로젝트 시작했어요! 같이 해요~",
    timestamp: new Date("2024-01-15T10:15:00"),
  },
  {
    id: 3,
    user: "이프론트",
    content: "리액트 공부 중입니다. 질문있어요!",
    timestamp: new Date("2024-01-15T11:00:00"),
  },
  {
    id: 4,
    user: "최백엔드",
    content: "Node.js API 구현 완료했습니다! 💪",
    timestamp: new Date("2024-01-15T14:20:00"),
  },
  {
    id: 5,
    user: "정풀스택",
    avatar: "/api/placeholder/32/32",
    content: "오늘 출석체크! 다들 화이팅하세요 🎯",
    timestamp: new Date("2024-01-15T16:45:00"),
  },
];
