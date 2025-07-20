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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { filterOptions } from "@/constants/filterOptions";
import { getStackColor } from "@/utils/stackColors";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: ApplicationFormData) => void;
  projectTitle: string;
  projectType: "project" | "study";
}

export interface ApplicationFormData {
  introduction: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
}

export function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  projectTitle,
  projectType,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    introduction: "",
    githubUrl: "",
    portfolioUrl: "",
    skills: [],
  });

  const [selectedSkill, setSelectedSkill] = useState("");

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSelectedSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.introduction) {
      alert("자기소개를 입력해주세요.");
      return;
    }

    onSubmit(formData);

    // 폼 초기화
    setFormData({
      introduction: "",
      githubUrl: "",
      portfolioUrl: "",
      skills: [],
    });
    setSelectedSkill("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-[#ffffff] flex items-center gap-2">
            <Badge
              className={
                projectType === "project"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              }
            >
              {projectType === "project" ? "🚀 프로젝트" : "📚 스터디"}
            </Badge>
            신청
          </DialogTitle>
          <p className="text-sm text-gray-500 dark:text-[#a0a0a0] mt-1">
            "{projectTitle}" {projectType === "project" ? "프로젝트" : "스터디"}
            에 신청합니다
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 자기소개 */}
          <div>
            <Label className="text-gray-900 dark:text-[#ffffff]">
              자기소개 *
            </Label>
            <Textarea
              value={formData.introduction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  introduction: e.target.value,
                }))
              }
              placeholder="프로젝트에 대한 관심과 자신의 경험, 기여할 수 있는 부분을 자유롭게 작성해주세요."
              className="min-h-[160px] bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff] resize-none"
              required
            />
          </div>

          {/* 기술 스택 */}
          <div>
            <Label className="text-gray-900 dark:text-[#ffffff]">
              보유 기술 스택 ({formData.skills.length}개 선택)
            </Label>
            <div className="mt-1">
              <Select value={selectedSkill} onValueChange={handleAddSkill}>
                <SelectTrigger className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333]">
                  <SelectValue placeholder="기술 스택을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.availableTechStacks
                    .filter((stack) => !formData.skills.includes(stack))
                    .map((stack) => (
                      <SelectItem key={stack} value={stack}>
                        {stack}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md font-medium ${getStackColor(
                      skill
                    )} flex items-center gap-1`}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 링크 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-[#ffffff]">
                GitHub URL
              </Label>
              <Input
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    githubUrl: e.target.value,
                  }))
                }
                placeholder="https://github.com/username"
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-[#ffffff]">
                포트폴리오 URL
              </Label>
              <Input
                value={formData.portfolioUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    portfolioUrl: e.target.value,
                  }))
                }
                placeholder="https://your-portfolio.com"
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">신청하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
