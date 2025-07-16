import { StandardPageLayout } from "@/components/layouts/standard-page-layout";

export default function ProjectLogPage() {
  return (
    <StandardPageLayout
      title="프로젝트 일지"
      description="팀원들의 개발 여정과 프로젝트 진행 상황을 공유하는 공간입니다 📝"
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-gray-600 dark:text-[#a0a0a0] text-lg">
          준비 중입니다...
        </p>
        <div className="text-gray-500 dark:text-[#a0a0a0] text-center space-y-2">
          <p className="text-sm">곧 다음 기능들이 추가될 예정입니다:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>개발 일지 작성 및 조회</li>
            <li>프로젝트 진행 상황 추적</li>
            <li>코드 리뷰 및 피드백</li>
            <li>기술 스택별 필터링</li>
            <li>개발자 성장 스토리</li>
          </ul>
        </div>
      </div>
    </StandardPageLayout>
  );
}
