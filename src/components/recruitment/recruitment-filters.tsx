"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilterState,
  StatusFilter,
  DateFilter,
  SortOption,
} from "@/types/filters";
import { filterOptions } from "@/constants/filterOptions";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface RecruitmentFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export function RecruitmentFilters({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
}: RecruitmentFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleTechStackToggle = (tech: string) => {
    const newTechStacks = filters.techStacks.includes(tech)
      ? filters.techStacks.filter((t) => t !== tech)
      : [...filters.techStacks, tech];

    onFiltersChange({ ...filters, techStacks: newTechStacks });
  };

  const handleStatusChange = (status: StatusFilter) => {
    onFiltersChange({ ...filters, status });
  };

  const handleDateFilterChange = (dateFilter: DateFilter) => {
    onFiltersChange({ ...filters, dateFilter });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: "",
      techStacks: [],
      status: "all",
      dateFilter: "all",
      sortBy: "latest",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.techStacks.length > 0 ||
    filters.status !== "all" ||
    filters.dateFilter !== "all";

  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] space-y-4">
      {/* 상단 검색 및 요약 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="제목, 내용, 작성자 검색..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#333333]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
            {filteredCount}개 / 전체 {totalCount}개
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            상세 필터
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 상세 필터 (펼침/접힘) */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-[#333333]">
          {/* 필터 선택 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 상태 필터 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-[#ffffff]">
                모집 상태
              </label>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#333333]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 기간 필터 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-[#ffffff]">
                마감 기간
              </label>
              <Select
                value={filters.dateFilter}
                onValueChange={handleDateFilterChange}
              >
                <SelectTrigger className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#333333]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.dateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 정렬 */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-[#ffffff]">
                정렬 기준
              </label>
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-[#333333]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 초기화 버튼 */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className="w-full h-10 text-sm"
              >
                <X className="w-4 h-4 mr-1" />
                초기화
              </Button>
            </div>
          </div>

          {/* 기술 스택 선택 */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-[#ffffff]">
              기술 스택 ({filters.techStacks.length}개 선택)
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {filterOptions.availableTechStacks.map((tech) => (
                <Badge
                  key={tech}
                  variant={
                    filters.techStacks.includes(tech) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-colors ${
                    filters.techStacks.includes(tech)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-[#333333]"
                  }`}
                  onClick={() => handleTechStackToggle(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* 선택된 필터 요약 */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-[#333333]">
              <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                활성 필터:
              </span>

              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  검색: "{filters.search}"
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleSearchChange("")}
                  />
                </Badge>
              )}

              {filters.status !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  상태:{" "}
                  {
                    filterOptions.statusOptions.find(
                      (o) => o.value === filters.status
                    )?.label
                  }
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleStatusChange("all")}
                  />
                </Badge>
              )}

              {filters.dateFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  기간:{" "}
                  {
                    filterOptions.dateOptions.find(
                      (o) => o.value === filters.dateFilter
                    )?.label
                  }
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleDateFilterChange("all")}
                  />
                </Badge>
              )}

              {filters.techStacks.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleTechStackToggle(tech)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
