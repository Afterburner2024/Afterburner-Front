"use client";

import { StandardPageLayout } from "@/components/layouts/standard-page-layout";
import { NewsArticleCard } from "@/components/home/news-article-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { techArticles } from "@/data/mockData";
import { useState, useMemo } from "react";
import { Search, Filter, TrendingUp, Clock, Grid, List } from "lucide-react";

export default function TechArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 모든 태그와 카테고리 추출
  const allTags = useMemo(() => {
    const tags = techArticles.flatMap((article) => article.tags);
    return Array.from(new Set(tags));
  }, []);

  const allCategories = useMemo(() => {
    const categories = techArticles.map((article) => article.category);
    return Array.from(new Set(categories));
  }, []);

  // 필터링된 아티클
  const filteredArticles = useMemo(() => {
    let filtered = techArticles;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 태그 필터
    if (selectedTag !== "all") {
      filtered = filtered.filter((article) =>
        article.tags.includes(selectedTag)
      );
    }

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // 정렬
    if (sortBy === "latest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return filtered;
  }, [searchTerm, selectedTag, selectedCategory, sortBy]);

  // 피처드 아티클 (첫 번째 아티클)
  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <StandardPageLayout
      title="기술 아티클"
      description="최신 개발 트렌드와 기술 인사이트를 확인하세요"
      contentClassName="space-y-8"
    >
      {/* 필터 & 검색 */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#333333] p-6 space-y-6">
        {/* 상단 컨트롤 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              총 {filteredArticles.length}개의 아티클
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#666666]">
              <TrendingUp className="w-4 h-4" />
              <span>실시간 업데이트</span>
            </div>
          </div>

          {/* 뷰 모드 전환 */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2"
            >
              <Grid className="w-4 h-4" />
              그리드
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              리스트
            </Button>
          </div>
        </div>

        {/* 필터 옵션 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="아티클 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 카테고리 필터 */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 카테고리</SelectItem>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 태그 필터 */}
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger>
              <SelectValue placeholder="태그 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 태그</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 정렬 */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 활성 필터 표시 */}
        {(searchTerm ||
          selectedTag !== "all" ||
          selectedCategory !== "all") && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                검색: "{searchTerm}"
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                카테고리: {selectedCategory}
              </Badge>
            )}
            {selectedTag !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                태그: {selectedTag}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedTag("all");
                setSelectedCategory("all");
              }}
              className="text-xs"
            >
              필터 초기화
            </Button>
          </div>
        )}
      </div>

      {/* 아티클 컨텐츠 */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-8">
          {/* 피처드 아티클 (첫 번째) */}
          {featuredArticle && viewMode === "grid" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-red-600 text-white">Featured</Badge>
                <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                  추천 아티클
                </span>
              </div>
              <NewsArticleCard article={featuredArticle} variant="featured" />
            </div>
          )}

          {/* 일반 아티클들 */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <NewsArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <NewsArticleCard
                  key={article.id}
                  article={article}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <Search className="w-16 h-16 text-gray-300 dark:text-[#666666] mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-600 dark:text-[#a0a0a0] mb-6">
            다른 검색어나 필터를 시도해보세요.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("all");
              setSelectedCategory("all");
            }}
            variant="outline"
          >
            필터 초기화
          </Button>
        </div>
      )}

      {/* 하단 정보 */}
      {filteredArticles.length > 0 && (
        <div className="text-center py-8 border-t border-gray-200 dark:border-[#333333]">
          <p className="text-gray-600 dark:text-[#a0a0a0] mb-4">
            더 많은 최신 기술 아티클이 곧 업데이트됩니다
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-[#666666]">
            <Clock className="w-4 h-4" />
            <span>매일 오전 9시 업데이트</span>
          </div>
        </div>
      )}
    </StandardPageLayout>
  );
}
