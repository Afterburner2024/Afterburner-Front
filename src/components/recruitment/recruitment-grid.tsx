import { RecruitmentPost } from "@/types/recruitment";
import { RecruitmentCard } from "./recruitment-card";
import { Reveal } from "@/components/ui/reveal";

interface RecruitmentGridProps {
  posts: RecruitmentPost[];
}

export function RecruitmentGrid({ posts }: RecruitmentGridProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
      {posts.map((post, idx) => (
        <Reveal key={post.id} delayMs={idx * 50}>
          <RecruitmentCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
