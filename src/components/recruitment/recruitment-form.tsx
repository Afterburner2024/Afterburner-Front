"use client";

import { useState } from "react";
import { NewPostForm, RecruitmentPost } from "@/types/recruitment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface RecruitmentFormProps {
  onSubmit: (post: RecruitmentPost) => void;
}

export function RecruitmentForm({ onSubmit }: RecruitmentFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState<NewPostForm>({
    title: "",
    content: "",
    stacks: "",
    deadline: "",
    memberCount: 1,
    type: "project",
  });

  const handleSubmit = () => {
    if (!newPost.title || !newPost.content || !newPost.deadline) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const post: RecruitmentPost = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      stacks: newPost.stacks
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      deadline: newPost.deadline,
      memberCount: newPost.memberCount,
      author: "현재사용자",
      createdAt: new Date().toISOString().split("T")[0],
      type: newPost.type,
    };

    onSubmit(post);
    setNewPost({
      title: "",
      content: "",
      stacks: "",
      deadline: "",
      memberCount: 1,
      type: "project",
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-[#00ff88] dark:hover:bg-[#00cc6a] text-white dark:text-[#0a0a0a] px-6 py-3">
          <Plus className="w-5 h-5 mr-2" />
          팀원 모집하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-[#ffffff]">
            팀원 모집글 작성
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-900 dark:text-[#ffffff]">제목 *</Label>
            <Input
              value={newPost.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              placeholder="프로젝트 제목을 입력하세요"
              className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
            />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#ffffff]">내용 *</Label>
            <Textarea
              value={newPost.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              placeholder="프로젝트 설명과 팀원 요구사항을 작성하세요"
              className="min-h-[100px] bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
            />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#ffffff]">
              기술 스택
            </Label>
            <Input
              value={newPost.stacks}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPost({ ...newPost, stacks: e.target.value })
              }
              placeholder="React, Node.js, MongoDB (쉼표로 구분)"
              className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-900 dark:text-[#ffffff]">
                모집 마감일 *
              </Label>
              <Input
                type="date"
                value={newPost.deadline}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPost({ ...newPost, deadline: e.target.value })
                }
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
              />
            </div>
            <div>
              <Label className="text-gray-900 dark:text-[#ffffff]">
                모집 인원
              </Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={newPost.memberCount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPost({
                    ...newPost,
                    memberCount: parseInt(e.target.value) || 1,
                  })
                }
                className="bg-white dark:bg-[#1a1a1a] border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 dark:border-[#333333] text-gray-900 dark:text-[#ffffff]"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-[#00ff88] dark:hover:bg-[#00cc6a] text-white dark:text-[#0a0a0a]"
            >
              등록
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
