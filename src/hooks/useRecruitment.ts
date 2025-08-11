"use client";

import { useMemo, useState } from "react";
import { mockPosts } from "@/data/mockData";
import { RecruitmentPost } from "@/types/recruitment";
import { FilterState } from "@/types/filters";
import { applyFilters } from "@/utils/filterUtils";
import { applyDynamicStatusToPosts } from "@/utils/statusUtils";

export function useRecruitment(initial: RecruitmentPost[] = mockPosts) {
  const [posts, setPosts] = useState<RecruitmentPost[]>(initial);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    techStacks: [],
    status: "all",
    dateFilter: "all",
    sortBy: "latest",
    typeFilter: "all",
  });

  const postsWithDynamicStatus = useMemo(
    () => applyDynamicStatusToPosts(posts),
    [posts]
  );

  const filteredPosts = useMemo(
    () => applyFilters(postsWithDynamicStatus, filters),
    [postsWithDynamicStatus, filters]
  );

  const addPost = (
    newPostData: Omit<RecruitmentPost, "id" | "createdAt">
  ): void => {
    const newPost: RecruitmentPost = {
      ...newPostData,
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return {
    posts: filteredPosts,
    totalCount: posts.length,
    rawPosts: posts,
    addPost,
    filters,
    setFilters,
  };
}
