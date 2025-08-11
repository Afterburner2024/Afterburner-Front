export interface ProjectLogEntry {
  id: number;
  recruitmentId: number; // 연결되는 모집글 ID (project/study)
  title: string;
  author: string;
  date: string; // ISO string (yyyy-MM-dd)
  tags: string[];
  summary: string;
  content: string;
  boardId?: number; // 여러 보드 중 하나에 속하도록 선택
  status?: "todo" | "inProgress" | "done"; // 칸반 상태
}
