"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { QuestionForm } from "@/types/question";
import {
  questionCategories,
  questionDifficulties,
  questionPriorities,
} from "@/types/question";

interface QuestionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestionCreateModal({
  isOpen,
  onClose,
}: QuestionCreateModalProps) {
  const [formData, setFormData] = useState<QuestionForm>({
    title: "",
    content: "",
    category: "",
    tags: [],
    difficulty: "intermediate",
    priority: "medium",
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: keyof QuestionForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 검증
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.category
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      // TODO: API 호출로 질문 생성
      console.log("질문 생성:", formData);

      // 성공 시 모달 닫기
      onClose();

      // 폼 초기화
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: [],
        difficulty: "intermediate",
        priority: "medium",
      });
    } catch (error) {
      console.error("질문 생성 실패:", error);
      alert("질문 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 질문 작성</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              제목 *
            </label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="질문의 제목을 입력하세요"
              required
            />
          </div>

          {/* 카테고리 */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              카테고리 *
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {questionCategories.slice(1).map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 난이도 및 우선순위 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">난이도</label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleInputChange("difficulty", value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionDifficulties.slice(1).map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">우선순위</label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  handleInputChange("priority", value as any)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionPriorities.slice(1).map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 태그 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">태그</label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="태그를 입력하고 Enter를 누르세요"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              내용 *
            </label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="질문의 상세 내용을 입력하세요. 코드 예시나 스크린샷을 포함하면 더 좋은 답변을 받을 수 있습니다."
              rows={8}
              required
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">질문 등록</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
