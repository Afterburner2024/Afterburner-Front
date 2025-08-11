"use client";

import { useMemo, useState } from "react";
import { questionMockData } from "@/data/questionMockData";
import { filterAndSortQuestions, QuestionSort } from "@/utils/query";

export function useQuestions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<QuestionSort>("latest");

  const questions = useMemo(
    () =>
      filterAndSortQuestions(
        questionMockData,
        searchQuery,
        selectedCategory,
        selectedStatus,
        sortBy
      ),
    [searchQuery, selectedCategory, selectedStatus, sortBy]
  );

  return {
    questions,
    searchQuery,
    selectedCategory,
    selectedStatus,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStatus,
    setSortBy,
  };
}
