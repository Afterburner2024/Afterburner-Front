import { FilterOptions } from "@/types/filters";

export const filterOptions: FilterOptions = {
  availableTechStacks: [
    // Frontend
    "React",
    "Vue",
    "Angular",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind",
    "Next.js",
    "Nuxt.js",

    // Backend
    "Node.js",
    "Express",
    "Python",
    "Django",
    "FastAPI",
    "Java",
    "Spring",
    "PHP",
    "C#",
    "Go",
    "Rust",

    // Database
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Firebase",
    "Supabase",

    // Mobile
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",

    // DevOps
    "Docker",
    "AWS",
    "GCP",
    "Azure",
    "Kubernetes",

    // AI/ML
    "TensorFlow",
    "PyTorch",
    "OpenAI",
    "Pandas",

    // Tools
    "Git",
    "GitHub",
    "GitLab",
    "Figma",
    "Photoshop",
  ],

  statusOptions: [
    { value: "all", label: "전체" },
    { value: "recruiting", label: "모집중" },
    { value: "urgent", label: "마감임박" },
    { value: "completed", label: "모집완료" },
  ],

  dateOptions: [
    { value: "all", label: "전체 기간" },
    { value: "thisWeek", label: "이번 주" },
    { value: "thisMonth", label: "이번 달" },
    { value: "urgent", label: "마감 임박 (7일 이내)" },
  ],

  sortOptions: [
    { value: "latest", label: "최신순" },
    { value: "deadline", label: "마감일순" },
    { value: "members", label: "모집인원순" },
    { value: "popular", label: "인기순" },
  ],
};
