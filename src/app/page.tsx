import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Afterburner
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              국비교육 수료생들을 위한 커뮤니티 플랫폼.
              <br />
              당신의 개발 여정을 함께 합니다.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/introduction">
              <Button>
                시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline">지원 받기</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
