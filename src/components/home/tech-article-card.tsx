import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";
import { getStackColor } from "@/utils/stackColors";

interface TechArticle {
  id: number;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  source: string;
  tags: string[];
  readTime: string;
}

interface TechArticleCardProps {
  article: TechArticle;
}

export function TechArticleCard({ article }: TechArticleCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="space-y-4">
        {/* 소스와 날짜 */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[#a0a0a0]">
          <span className="font-medium">{article.source}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {article.title}
        </h3>

        {/* 요약 */}
        <p className="text-gray-600 dark:text-[#a0a0a0] text-sm line-clamp-3 leading-relaxed">
          {article.summary}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} className={`text-xs ${getStackColor(tag)}`}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#333333]">
          <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
            by {article.author}
          </span>
          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-[#666666]" />
        </div>
      </div>
    </Card>
  );
}
