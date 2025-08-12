"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Kanban, Star, Search } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { projectLogs } from "@/data/projectLogs";
import { useProjectLogs } from "@/hooks/useProjectLogs";
import { projectBoardsMeta } from "@/data/projectBoardsMeta";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";

export default function ProjectLogPage() {
  const [activeTab, setActiveTab] = useState<"all" | "fav">("all");
  const [query, setQuery] = useState("");
  const { favorites, isFavorite, toggle } = useFavorites();

  const { byBoard, getCounts } = useProjectLogs();

  const boards = useMemo(() => {
    const filtered = projectBoardsMeta.filter((b) =>
      [b.title, b.description || ""].some((t) =>
        t.toLowerCase().includes(query.toLowerCase())
      )
    );
    if (activeTab === "fav")
      return filtered.filter((b) => favorites.includes(b.id));
    return filtered;
  }, [activeTab, favorites, query]);

  return (
    <StandardPageLayout
      title="프로젝트 일지"
      description="보드별(프로젝트/스터디)로 일지를 관리하고, 칸반 진행도를 확인하세요."
      contentClassName="space-y-10"
    >
      {/* 히어로 */}
      <section className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-5">
          <p className="text-gray-600 dark:text-[#a0a0a0] max-w-2xl">
            팀의 진행상황을 보드 단위로 한눈에. 칸반 진행도와 최근 일지를
            확인하세요.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              새 일지 작성
            </Button>
            <Button
              variant="outline"
              className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              보드 만들기
            </Button>
          </div>
        </div>
      </section>

      {/* 탭 + 검색 */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("all")}
          >
            전체
          </Button>
          <Button
            variant={activeTab === "fav" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("fav")}
          >
            즐겨찾기
          </Button>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="보드 검색..."
            className="pl-9"
            aria-label="보드 검색"
          />
        </div>
      </section>

      {/* 보드 카드 */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {boards.map((board) => {
          const logs = byBoard[board.id] || [];
          const { todo, inProgress, done, total } = getCounts(board.id);
          const doneRate = total ? Math.round((done / total) * 100) : 0;
          const isFav = isFavorite(board.id);

          return (
            <Card
              key={board.id}
              className="p-6 bg-card/95 backdrop-blur border border-border rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {board.type && (
                      <Badge
                        variant="soft"
                        className={
                          board.type === "project"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {board.type === "project" ? "Project" : "Study"}
                      </Badge>
                    )}
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {board.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-[#a0a0a0] line-clamp-2">
                    {board.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isFav ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggle(board.id)}
                    className="inline-flex items-center gap-1"
                    aria-pressed={isFav}
                    aria-label={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                  >
                    <Star className="w-4 h-4" />
                    {isFav ? "즐겨찾기됨" : "즐겨찾기"}
                  </Button>
                  {board.githubUrl && (
                    <Link
                      href={board.githubUrl}
                      target="_blank"
                      aria-label={`${board.title} GitHub로 이동`}
                      className="text-sm inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </Link>
                  )}
                </div>
              </div>

              {/* 진행도 */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#666666] mb-1">
                  <span>진행도</span>
                  <span>{doneRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-[#333333] overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${doneRate}%` }}
                  />
                </div>
              </div>

              {/* 최근 일지 */}
              <div className="mt-4 space-y-2">
                {logs.slice(0, 1).map((log) => (
                  <Link
                    key={log.id}
                    href={`/project-log/${log.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between py-2 px-2 rounded hover:bg-gray-50 dark:hover:bg-[#0f0f0f]">
                      <div className="text-sm text-gray-900 dark:text-white font-medium line-clamp-1">
                        {log.title}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-[#666666]">
                        {new Date(log.date).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </Link>
                ))}
                {logs.length === 0 && (
                  <div className="text-sm text-gray-500 dark:text-[#666666]">
                    아직 작성된 일지가 없습니다.
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-[#666666]">
                  Todo <CountUp value={todo} /> · Doing{" "}
                  <CountUp value={inProgress} /> · Done <CountUp value={done} />
                </div>
                <Link
                  href={`/project-log/board/${board.id}`}
                  aria-label={`${board.title} 보드로 이동`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  >
                    <Kanban className="w-4 h-4" /> 보드로 이동
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </section>
    </StandardPageLayout>
  );
}
