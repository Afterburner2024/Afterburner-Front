import { ProjectLogEntry } from "@/types/projectLog";

export const projectLogs: ProjectLogEntry[] = [
  {
    id: 1,
    recruitmentId: 1,
    title: "초기 레이아웃 및 라우팅 구성",
    author: "주순태",
    date: "2024-01-15",
    tags: ["Next.js", "Layout"],
    summary: "메인/스탠다드 레이아웃, 사이드네비 정비",
    content:
      "메인 레이아웃과 스탠다드 레이아웃을 정리하고, 공통 네비를 구성했습니다. App Router 기반으로 상세 페이지 라우트도 추가.",
    boardId: 1,
    status: "done",
  },
  {
    id: 2,
    recruitmentId: 1,
    title: "질문게시판 초안 도입",
    author: "강형석",
    date: "2024-01-16",
    tags: ["Q&A", "UI"],
    summary: "질문 목록/상세/작성 모달 구현",
    content:
      "질문 목록 필터/정렬 및 상세 답변/채택/투표 UI를 추가했습니다. 목데이터 기반으로 동작.",
    boardId: 1,
    status: "inProgress",
  },
  {
    id: 3,
    recruitmentId: 3,
    title: "알고리즘 스터디 킥오프",
    author: "이스터디",
    date: "2024-01-18",
    tags: ["Algorithm", "Study"],
    summary: "진행 방식/PR 규칙 확정",
    content:
      "주 2회 온라인, 레포 PR 리뷰 중심으로 운영. 문제 난이도별 담당 지정 및 회고 루틴 수립.",
    boardId: 2,
    status: "todo",
  },
];
