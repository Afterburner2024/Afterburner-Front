export interface RecruitmentPost {
  id: number;
  title: string;
  content: string;
  stacks: string[];
  deadline: string;
  memberCount: number;
  author: string;
  createdAt: string;
  status?: "recruiting" | "urgent" | "completed";
}

export interface NewPostForm {
  title: string;
  content: string;
  stacks: string;
  deadline: string;
  memberCount: number;
}
