"use client";

import { useMemo } from "react";
import { projectLogs } from "@/data/projectLogs";

export function useProjectLogs() {
  const byBoard = useMemo(() => {
    const map: Record<number, typeof projectLogs> = {} as any;
    for (const log of projectLogs) {
      const key = log.boardId || 0;
      map[key] = map[key] ? [...map[key], log] : [log];
    }
    return map;
  }, []);

  const getCounts = (boardId: number) => {
    const logs = byBoard[boardId] || [];
    const todo = logs.filter((l) => l.status === "todo").length;
    const inProgress = logs.filter((l) => l.status === "inProgress").length;
    const done = logs.filter((l) => l.status === "done").length;
    return { todo, inProgress, done, total: todo + inProgress + done };
  };

  return { byBoard, getCounts };
}
