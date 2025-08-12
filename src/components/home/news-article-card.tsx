import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, ExternalLink, User, Calendar } from "lucide-react";
import { getStackColor } from "@/utils/stackColors";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface TechArticle {
  id: number;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  source: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
  category: string;
}

interface NewsArticleCardProps {
  article: TechArticle;
  variant?: "default" | "featured" | "compact";
}

function NewsArticleCardComponent({
  article,
  variant = "default",
}: NewsArticleCardProps) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Link
      href={`/tech-articles/${article.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
      aria-label={`기사 상세보기: ${article.title}`}
    >
      {children}
    </Link>
  );

  if (variant === "featured") {
    return (
      <Wrapper>
        <Card className="overflow-hidden bg-card/95 backdrop-blur border border-border rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="text-white border-white/70">
                {article.category}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl font-bold line-clamp-2 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2">
                {article.summary}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} className={`text-xs ${getStackColor(tag)}`}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-[#a0a0a0]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#333333]">
              <span className="text-sm font-medium text-gray-700 dark:text-[#cccccc]">
                {article.source}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-[#666666]" />
            </div>
          </div>
        </Card>
      </Wrapper>
    );
  }

  if (variant === "compact") {
    return (
      <Wrapper>
        <Card className="overflow-hidden bg-card/95 backdrop-blur border border-border rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex">
            <div className="relative w-32 h-28 flex-shrink-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="soft" className="text-xs">
                  {article.category}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-[#666666]">
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#666666]">
                <span>{article.author}</span>
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card className="overflow-hidden bg-card/95 backdrop-blur border border-border rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="soft" className="text-xs">
              {article.category}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-[#a0a0a0] text-sm line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} className={`text-xs ${getStackColor(tag)}`}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-[#a0a0a0] pt-2 border-t border-gray-100 dark:border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-[#666666]">
              {new Date(article.publishedAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
}

export const NewsArticleCard = memo(NewsArticleCardComponent);
