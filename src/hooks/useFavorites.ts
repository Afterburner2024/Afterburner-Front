"use client";

import { useCallback, useEffect, useState } from "react";
import { loadFavorites, toggleFavorite } from "@/utils/boardStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const toggle = useCallback((boardId: number) => {
    setFavorites(toggleFavorite(boardId));
  }, []);

  const isFavorite = useCallback(
    (boardId: number) => favorites.includes(boardId),
    [favorites]
  );

  return { favorites, isFavorite, toggle };
}
