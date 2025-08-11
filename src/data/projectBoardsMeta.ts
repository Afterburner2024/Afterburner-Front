export interface ProjectBoardMeta {
  id: number;
  title: string;
  githubUrl?: string;
  description?: string;
  type?: "project" | "study";
}

export const projectBoardsMeta: ProjectBoardMeta[] = [
  {
    id: 1,
    title: "Afterburner Front",
    githubUrl: "https://github.com/Afterburner2024/Afterburner-Front",
    description: "Afterburner 프론트엔드 보드",
    type: "project",
  },
  {
    id: 2,
    title: "JS 알고리즘 스터디",
    githubUrl: "https://github.com/org/algorithm-study",
    description: "알고리즘 스터디 보드",
    type: "study",
  },
];
