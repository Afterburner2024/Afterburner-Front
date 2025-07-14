import { MainLayout } from "@/components/layouts/main-layout";

export default function AttendancePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <h1 className="text-4xl font-bold">출석 게시판</h1>
        <p className="text-muted-foreground">준비 중입니다...</p>
      </div>
    </MainLayout>
  );
}
