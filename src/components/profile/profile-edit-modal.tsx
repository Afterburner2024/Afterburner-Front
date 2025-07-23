"use client";

import { User, ProfileEditForm } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterOptions } from "@/constants/filterOptions";
import { getStackColor } from "@/utils/stackColors";
import { useState } from "react";
import { X, Plus } from "lucide-react";

interface ProfileEditModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSave: (formData: ProfileEditForm) => void;
}

export function ProfileEditModal({
  user,
  open,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileEditForm>({
    userName: user.userName,
    bio: user.bio || "",
    company: user.company || "",
    location: user.location || "",
    blogUrl: user.blogUrl || "",
    githubUsername: user.githubUsername || "",
    userTechStacks: (user.userTechStacks || []).sort((a, b) =>
      a.localeCompare(b)
    ),
    isPublic: user.isPublic,
    showEmail: user.showEmail,
    showPhone: user.showPhone,
  });

  const [selectedTechStack, setSelectedTechStack] = useState<string>("");

  const handleInputChange = (field: keyof ProfileEditForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTechStack = () => {
    if (
      selectedTechStack &&
      !formData.userTechStacks.includes(selectedTechStack)
    ) {
      setFormData((prev) => ({
        ...prev,
        userTechStacks: [...prev.userTechStacks, selectedTechStack].sort(
          (a, b) => a.localeCompare(b)
        ),
      }));
      setSelectedTechStack("");
    }
  };

  const removeTechStack = (stackToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      userTechStacks: prev.userTechStacks.filter(
        (stack) => stack !== stackToRemove
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogDescription>
            프로필 정보를 수정하고 다른 사용자에게 보여질 정보를 설정하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              기본 정보
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">이름</Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">회사</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="소속 회사"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">소개</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="자신을 소개해주세요"
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">위치</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="서울, 대한민국"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUsername">GitHub 사용자명</Label>
                <Input
                  id="githubUsername"
                  value={formData.githubUsername}
                  placeholder="GitHub 연동 시 자동 설정됩니다"
                  disabled
                  className="bg-gray-50 dark:bg-[#2a2a2a] text-gray-500 dark:text-[#666666] cursor-not-allowed"
                />
                {formData.githubUsername && (
                  <p className="text-xs text-gray-500 dark:text-[#666666]">
                    ℹ️ GitHub 연동을 통해 자동으로 설정된 정보입니다
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blogUrl">블로그 URL</Label>
              <Input
                id="blogUrl"
                type="url"
                value={formData.blogUrl}
                onChange={(e) => handleInputChange("blogUrl", e.target.value)}
                placeholder="https://myblog.com"
              />
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              기술 스택
            </h3>

            <div className="flex gap-2">
              <Select
                value={selectedTechStack}
                onValueChange={setSelectedTechStack}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="기술 스택 선택" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.availableTechStacks
                    .filter(
                      (stack: string) =>
                        !formData.userTechStacks.includes(stack)
                    )
                    .sort((a: string, b: string) => a.localeCompare(b))
                    .map((stack: string) => (
                      <SelectItem key={stack} value={stack}>
                        {stack}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={addTechStack}
                disabled={!selectedTechStack}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                추가
              </Button>
            </div>

            {/* 선택된 기술 스택 */}
            {formData.userTechStacks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {[...formData.userTechStacks]
                  .sort((a, b) => a.localeCompare(b))
                  .map((stack) => (
                    <div key={stack} className="relative group">
                      <Badge
                        className={`${getStackColor(stack)} pr-8 h-7 relative`}
                      >
                        {stack}
                        <button
                          type="button"
                          onClick={() => removeTechStack(stack)}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full text-white text-xs flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* 공개 설정 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              공개 설정
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isPublic">프로필 공개</Label>
                  <p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                    다른 사용자가 내 프로필을 볼 수 있습니다
                  </p>
                </div>
                <input
                  id="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) =>
                    handleInputChange("isPublic", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showEmail">이메일 공개</Label>
                  <p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                    프로필에 이메일 주소를 표시합니다
                  </p>
                </div>
                <input
                  id="showEmail"
                  type="checkbox"
                  checked={formData.showEmail}
                  onChange={(e) =>
                    handleInputChange("showEmail", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showPhone">전화번호 공개</Label>
                  <p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                    프로필에 전화번호를 표시합니다
                  </p>
                </div>
                <input
                  id="showPhone"
                  type="checkbox"
                  checked={formData.showPhone}
                  onChange={(e) =>
                    handleInputChange("showPhone", e.target.checked)
                  }
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">저장하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
