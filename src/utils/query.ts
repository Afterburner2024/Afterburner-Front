import { QuestionPost } from "@/types/question";

export type QuestionSort = "latest" | "popular" | "unanswered";

export function filterAndSortQuestions(
  questions: QuestionPost[],
  searchQuery: string,
  selectedCategory: string,
  selectedStatus: string,
  sortBy: QuestionSort
): QuestionPost[] {
  let filtered = [...questions];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (question) =>
        question.title.toLowerCase().includes(q) ||
        question.content.toLowerCase().includes(q) ||
        question.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (selectedCategory !== "all") {
    filtered = filtered.filter(
      (question) => question.category === selectedCategory
    );
  }

  if (selectedStatus !== "all") {
    filtered = filtered.filter(
      (question) => question.status === selectedStatus
    );
  }

  switch (sortBy) {
    case "latest":
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "popular":
      filtered.sort((a, b) => b.viewCount - a.viewCount);
      break;
    case "unanswered":
      filtered.sort((a, b) => a.answerCount - b.answerCount);
      break;
  }

  return filtered;
}
