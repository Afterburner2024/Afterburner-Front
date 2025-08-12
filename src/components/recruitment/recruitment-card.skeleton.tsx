import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecruitmentCardSkeleton() {
  return (
    <Card className="p-6 h-[400px] flex flex-col justify-between bg-card/95 backdrop-blur border border-border rounded-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-14" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10" />
        </div>
        <div className="flex items-center justify-between text-xs">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  );
}

export default RecruitmentCardSkeleton;
