import { RecruitmentPost } from "@/types/recruitment";
import { RecruitmentCard } from "./recruitment-card";
import { Reveal } from "@/components/ui/reveal";
import { memo } from "react";
import { RecruitmentCardSkeleton } from "./recruitment-card.skeleton";

interface RecruitmentGridProps {
  posts: RecruitmentPost[];
  isLoading?: boolean;
}

function RecruitmentGridComponent({
  posts,
  isLoading = false,
}: RecruitmentGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8"
        role="list"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <RecruitmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-[#ffffff] mb-2">
          아직 모집 중인 팀이 없습니다
        </h3>
        <p className="text-gray-600 dark:text-[#a0a0a0]">
          첫 번째 팀원 모집글을 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8"
      role="list"
    >
      {posts.map((post, idx) => (
        <Reveal key={post.id} delayMs={idx * 50}>
          <div role="listitem">
            <RecruitmentCard post={post} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export const RecruitmentGrid = memo(RecruitmentGridComponent);
