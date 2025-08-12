"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, ExternalLink } from "lucide-react";
import { techArticles } from "@/data/mockData";

export default function TechArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);

  const article = techArticles.find((a) => a.id === id);
  if (!article) {
    return (
      <StandardPageLayout
        title="기술 아티클"
        description="아티클을 찾을 수 없습니다."
      >
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-[#a0a0a0] mb-6">
            요청하신 아티클이 존재하지 않습니다.
          </p>
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> 뒤로가기
          </Button>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout
      title={article.title}
      description={article.summary}
      contentClassName="space-y-10"
    >
      {/* 메타 정보 */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-[#a0a0a0]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="soft" className="text-xs">
            {article.category}
          </Badge>
          <a
            href="#source"
            className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-[#666666]"
          >
            출처 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 이미지 */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* 본문 (요약을 본문으로 대체) */}
      <article className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-[#cccccc] leading-relaxed">
          {article.summary}
        </p>
        <p className="text-gray-700 dark:text-[#cccccc] leading-relaxed mt-4">
          전체 본문은 추후 백엔드 연동 시 제공됩니다. 현재는 요약을 본문으로
          대체하여 표시합니다.
        </p>
      </article>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* 액션 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-[#333333]">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로
        </Button>
        <a
          id="source"
          href={"#"}
          className="text-sm text-gray-600 dark:text-[#a0a0a0]"
        >
          {article.source}
        </a>
      </div>
    </StandardPageLayout>
  );
}
