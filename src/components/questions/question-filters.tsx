"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  questionCategories,
  questionStatuses,
  questionDifficulties,
  questionPriorities,
} from "@/types/question";

interface QuestionFiltersProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export function QuestionFilters({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: QuestionFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="카테고리" />
        </SelectTrigger>
        <SelectContent>
          {questionCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="상태" />
        </SelectTrigger>
        <SelectContent>
          {questionStatuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
