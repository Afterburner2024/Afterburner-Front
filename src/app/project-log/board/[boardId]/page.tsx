"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Kanban,
  NotebookPen,
  ArrowLeft,
} from "lucide-react";
import { projectBoardsMeta } from "@/data/projectBoardsMeta";
import { projectLogs } from "@/data/projectLogs";
import { Textarea } from "@/components/ui/textarea";
import { loadBoardState, saveBoardState } from "@/utils/boardStorage";

export default function ProjectBoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = parseInt(params.boardId as string, 10);
  const board = projectBoardsMeta.find((b) => b.id === boardId);
  const initialLogs = useMemo(
    () => projectLogs.filter((l) => (l.boardId || 0) === boardId),
    [boardId]
  );

  const [notes, setNotes] = useState<string>("");
  const [statuses, setStatuses] = useState<
    Record<number, "todo" | "inProgress" | "done">
  >({});

  useEffect(() => {
    const stored = loadBoardState(boardId);
    if (stored?.notes) setNotes(stored.notes);
    if (stored?.cards) {
      const map: Record<number, "todo" | "inProgress" | "done"> = {};
      Object.values(stored.cards).forEach((c) => (map[c.id] = c.status));
      setStatuses(map);
    } else {
      const map: Record<number, "todo" | "inProgress" | "done"> = {};
      for (const l of initialLogs) if (l.status) map[l.id] = l.status;
      setStatuses(map);
    }
  }, [boardId, initialLogs]);

  const setStatus = (logId: number, status: "todo" | "inProgress" | "done") => {
    setStatuses((prev) => {
      const next = { ...prev, [logId]: status };
      saveBoardState(boardId, {
        cards: Object.fromEntries(
          Object.entries(next).map(([id, st]) => [
            id,
            { id: Number(id), status: st as any },
          ])
        ),
        notes,
      });
      return next;
    });
  };

  const handleSaveNotes = () => {
    saveBoardState(boardId, {
      cards: Object.fromEntries(
        Object.entries(statuses).map(([id, st]) => [
          id,
          { id: Number(id), status: st as any },
        ])
      ),
      notes,
    });
  };

  if (!board) {
    return (
      <StandardPageLayout
        title="프로젝트 보드"
        description="보드를 찾을 수 없습니다."
      >
        <div className="text-center py-16 text-gray-600 dark:text-[#a0a0a0]">
          보드가 존재하지 않습니다.
        </div>
      </StandardPageLayout>
    );
  }

  const todo = initialLogs.filter(
    (l) => (statuses[l.id] || l.status) === "todo"
  );
  const inProgress = initialLogs.filter(
    (l) => (statuses[l.id] || l.status) === "inProgress"
  );
  const done = initialLogs.filter(
    (l) => (statuses[l.id] || l.status) === "done"
  );

  return (
    <StandardPageLayout
      title={board.title}
      description={board.description || "보드 상세"}
      contentClassName="space-y-8"
    >
      {/* 뒤로가기 */}
      <section className="w-full max-w-7xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-4 h-4" /> 뒤로가기
        </Button>
      </section>
      {/* 헤더 (깃허브 링크) */}
      <section className="w-full max-w-7xl mx-auto flex items-center justify-end">
        {board.githubUrl ? (
          <Link
            href={board.githubUrl}
            target="_blank"
            aria-label={`${board.title} GitHub로 이동`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
          >
            <Github className="w-4 h-4" /> GitHub{" "}
            <ExternalLink className="w-4 h-4" />
          </Link>
        ) : (
          <div className="text-xs text-gray-500 dark:text-[#666666]">
            깃허브 링크 없음
          </div>
        )}
      </section>

      {/* 칸반 */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: "todo", label: "Todo", items: todo },
          { key: "inProgress", label: "Doing", items: inProgress },
          { key: "done", label: "Done", items: done },
        ].map((col) => (
          <Card
            key={col.key}
            className="p-4 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white inline-flex items-center gap-2">
                <Kanban className="w-4 h-4" /> {col.label}
              </h3>
              <Badge variant="secondary">{col.items.length}</Badge>
            </div>
            <div className="space-y-2">
              {col.items.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded border border-gray-100 dark:border-[#333333]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/project-log/${log.id}`}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded"
                        aria-label={`일지 상세보기: ${log.title}`}
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {log.title}
                        </div>
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-[#666666] mt-1">
                        {log.author} ·{" "}
                        {new Date(log.date).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {col.key !== "todo" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setStatus(log.id, "todo")}
                          aria-label="ToDo로 이동"
                        >
                          ToDo
                        </Button>
                      )}
                      {col.key !== "inProgress" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setStatus(log.id, "inProgress")}
                          aria-label="Doing으로 이동"
                        >
                          Doing
                        </Button>
                      )}
                      {col.key !== "done" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setStatus(log.id, "done")}
                          aria-label="Done으로 이동"
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {col.items.length === 0 && (
                <div className="text-xs text-gray-500 dark:text-[#666666]">
                  항목 없음
                </div>
              )}
            </div>
          </Card>
        ))}
      </section>

      {/* 노트 */}
      <section className="w-full max-w-7xl mx-auto">
        <Card className="p-4 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white inline-flex items-center gap-2">
              <NotebookPen className="w-4 h-4" /> 보드 노트
            </h3>
            <Button size="sm" onClick={handleSaveNotes}>
              저장
            </Button>
          </div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={8}
            placeholder="회의 메모, 결정 사항, 링크 등을 자유롭게 작성하세요."
          />
        </Card>
      </section>

      {/* 일지 전체 리스트 */}
      <section className="w-full max-w-7xl mx-auto">
        <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white inline-flex items-center gap-2">
              전체 일지
            </h3>
            <Badge variant="secondary">{initialLogs.length}</Badge>
          </div>
          <div className="space-y-2">
            {initialLogs.map((log) => (
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
            {initialLogs.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-[#666666]">
                작성된 일지가 없습니다.
              </div>
            )}
          </div>
        </Card>
      </section>
    </StandardPageLayout>
  );
}
