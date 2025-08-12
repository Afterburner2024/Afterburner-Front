"use client";

import { useParams, useRouter } from "next/navigation";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { projectLogs } from "@/data/projectLogs";

export default function ProjectLogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);
  const log = projectLogs.find((l) => l.id === id);

  if (!log) {
    return (
      <StandardPageLayout
        title="프로젝트 일지"
        description="일지를 찾을 수 없습니다."
      >
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-[#a0a0a0] mb-6">
            요청하신 일지가 존재하지 않습니다.
          </p>
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-4 h-4" /> 뒤로가기
          </Button>
        </div>
      </StandardPageLayout>
    );
  }

  return (
    <StandardPageLayout title={log.title} contentClassName="space-y-10">
      {/* 메타 */}
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-[#a0a0a0]">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{log.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(log.date).toLocaleDateString("ko-KR")}</span>
        </div>
        <Link
          href={`/recruitment/${log.recruitmentId}`}
          className="ml-auto inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
          aria-label="관련 모집글로 이동"
        >
          <LinkIcon className="w-4 h-4" /> 관련 모집글로 이동
        </Link>
      </div>

      {/* 본문 */}
      <article className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-[#cccccc] leading-relaxed">
          {log.content}
        </p>
      </article>

      {/* 태그 */}
      <div className="flex items-center gap-2 flex-wrap">
        {log.tags.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="inline-flex items-center gap-1"
          >
            <Tag className="w-3 h-3" /> {t}
          </Badge>
        ))}
      </div>

      {/* 액션 */}
      <div className="pt-4 border-t border-gray-200 dark:border-[#333333] flex justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          aria-label="목록으로"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로
        </Button>
      </div>
    </StandardPageLayout>
  );
}
