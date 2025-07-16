import { Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecruitmentHeaderProps {
  totalPosts: number;
  onCreatePost: () => void;
}

export function RecruitmentHeader({
  totalPosts,
  onCreatePost,
}: RecruitmentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <p className="text-gray-500 dark:text-[#a0a0a0] text-sm text-center sm:text-left">
        <Megaphone className="w-4 h-4 inline-block mr-1" />
        현재 {totalPosts}개의 프로젝트가 팀원을 모집하고 있습니다
      </p>
      <Button
        onClick={onCreatePost}
        className="flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />새 모집글
      </Button>
    </div>
  );
}
