"use client";

import { useState } from "react";
import { RecruitmentPost } from "@/types/recruitment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { filterOptions } from "@/constants/filterOptions";
import { getStackColor } from "@/utils/stackColors";

interface RecruitmentCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<RecruitmentPost, "id" | "createdAt">) => void;
}

export function RecruitmentCreateModal({
  isOpen,
  onClose,
  onSubmit,
}: RecruitmentCreateModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    memberCount: 1,
    deadline: "",
    stacks: [] as string[],
    author: "익명",
  });

  const [selectedStack, setSelectedStack] = useState("");
  const [customStack, setCustomStack] = useState("");

  const handleAddStack = (stack: string) => {
    if (stack && !formData.stacks.includes(stack)) {
      setFormData((prev) => ({
        ...prev,
        stacks: [...prev.stacks, stack],
      }));
      setSelectedStack("");
      setCustomStack("");
    }
  };

  const handleRemoveStack = (stackToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((stack) => stack !== stackToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.deadline) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    onSubmit(formData);

    // 폼 초기화
    setFormData({
      title: "",
      content: "",
      memberCount: 1,
      deadline: "",
      stacks: [],
      author: "익명",
    });

    onClose();
  };

  const availableStacks = filterOptions.availableTechStacks.filter(
    (stack) => !formData.stacks.includes(stack)
  );

  // 커스텀 스택인지 확인 (기존 스택 목록에 없으면 커스텀)
  const isCustomStack = (stack: string) => {
    return !filterOptions.availableTechStacks.includes(stack);
  };

  // 커스텀 스택 색상
  const getCustomStackColor = () => "bg-purple-500 text-white";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            팀원 모집글 작성
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            {/* 왼쪽 영역 */}
            <div className="lg:col-span-4 space-y-6">
              {/* 제목 */}
              <div>
                <Label htmlFor="title">프로젝트 제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="프로젝트 제목을 입력하세요"
                  required
                />
              </div>

              {/* 모집 인원 & 마감일 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="memberCount">모집 인원</Label>
                  <Input
                    id="memberCount"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.memberCount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        memberCount: parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="deadline">마감일 *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              {/* 기술 스택 */}
              <div>
                <Label>기술 스택</Label>

                {/* 기존 스택 선택 */}
                <div className="mb-3">
                  <Select value={selectedStack} onValueChange={handleAddStack}>
                    <SelectTrigger>
                      <SelectValue placeholder="기술 스택을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStacks.map((stack) => (
                        <SelectItem key={stack} value={stack}>
                          {stack}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 커스텀 스택 입력 */}
                <div className="mb-3">
                  <Input
                    value={customStack}
                    onChange={(e) => setCustomStack(e.target.value)}
                    placeholder="목록에 없는 기술 스택을 입력하세요 (Enter로 추가)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddStack(customStack);
                      }
                    }}
                  />
                </div>

                {/* 선택된 스택들 */}
                {formData.stacks.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.stacks.map((stack) => (
                      <Badge
                        key={stack}
                        className={`${
                          isCustomStack(stack)
                            ? getCustomStackColor()
                            : getStackColor(stack)
                        } flex items-center gap-1`}
                      >
                        {stack}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleRemoveStack(stack)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 오른쪽 영역 - 프로젝트 설명 */}
            <div className="lg:col-span-6">
              <Label htmlFor="content">프로젝트 설명 *</Label>
              <Textarea
                id="content"
                value={formData.content}
                className="resize-none h-96"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="프로젝트에 대한 상세한 설명을 작성하세요"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                추후 이지윅 에디터로 교체 예정
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">등록하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
