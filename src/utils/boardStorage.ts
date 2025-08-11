const FAVORITES_KEY = "ab_fav_boards";

export interface StoredCard {
  id: number;
  status: "todo" | "inProgress" | "done";
}

export interface StoredBoardState {
  cards: Record<number, StoredCard>; // logId -> status
  notes?: string;
}

export function loadBoardState(boardId: number): StoredBoardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`ab_board_${boardId}`);
    return raw ? (JSON.parse(raw) as StoredBoardState) : null;
  } catch {
    return null;
  }
}

export function saveBoardState(boardId: number, state: StoredBoardState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`ab_board_${boardId}`, JSON.stringify(state));
}

export function loadFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(boardId: number): number[] {
  const favs = new Set(loadFavorites());
  if (favs.has(boardId)) favs.delete(boardId);
  else favs.add(boardId);
  const arr = Array.from(favs);
  if (typeof window !== "undefined") {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr));
  }
  return arr;
}
