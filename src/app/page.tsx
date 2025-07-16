import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6"></div>
      </div>
    </MainLayout>
  );
}
