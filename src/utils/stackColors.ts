// 기술 스택별 색상 정의
export const getStackColor = (stack: string): string => {
  const stackColors: { [key: string]: string } = {
    // Frontend
    React: "bg-blue-500 text-white",
    Vue: "bg-green-500 text-white",
    Angular: "bg-red-600 text-white",
    JavaScript: "bg-yellow-400 text-black",
    TypeScript: "bg-blue-600 text-white",
    HTML: "bg-orange-500 text-white",
    CSS: "bg-blue-400 text-white",
    Sass: "bg-pink-500 text-white",
    Tailwind: "bg-cyan-500 text-white",
    "Next.js": "bg-black text-white",
    "Nuxt.js": "bg-green-600 text-white",

    // Backend
    "Node.js": "bg-green-700 text-white",
    Express: "bg-gray-600 text-white",
    Python: "bg-blue-500 text-white",
    Django: "bg-green-800 text-white",
    FastAPI: "bg-teal-600 text-white",
    Java: "bg-red-500 text-white",
    Spring: "bg-green-600 text-white",
    PHP: "bg-purple-600 text-white",
    "C#": "bg-purple-700 text-white",
    Go: "bg-cyan-600 text-white",
    Rust: "bg-orange-600 text-white",

    // Database
    MongoDB: "bg-green-500 text-white",
    MySQL: "bg-blue-600 text-white",
    PostgreSQL: "bg-blue-800 text-white",
    Redis: "bg-red-600 text-white",
    Firebase: "bg-yellow-600 text-white",
    Supabase: "bg-green-600 text-white",

    // Mobile
    "React Native": "bg-blue-500 text-white",
    Flutter: "bg-blue-400 text-white",
    Swift: "bg-orange-500 text-white",
    Kotlin: "bg-purple-500 text-white",

    // DevOps
    Docker: "bg-blue-600 text-white",
    AWS: "bg-orange-400 text-black",
    GCP: "bg-blue-500 text-white",
    Azure: "bg-blue-700 text-white",
    Kubernetes: "bg-blue-600 text-white",

    // AI/ML
    TensorFlow: "bg-orange-500 text-white",
    PyTorch: "bg-red-500 text-white",
    OpenAI: "bg-black text-white",
    Pandas: "bg-blue-600 text-white",

    // Tools
    Git: "bg-orange-600 text-white",
    GitHub: "bg-gray-800 text-white",
    GitLab: "bg-orange-500 text-white",
    Figma: "bg-purple-500 text-white",
    Photoshop: "bg-blue-600 text-white",
  };

  return stackColors[stack] || "bg-gray-500 text-white"; // 기본 색상
};
