"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ContributorCardProps {
  contributor: {
    id: number;
    name: string;
    github: string;
    image: string;
  };
}

export function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-[120px]">
      <div className="p-4 h-full">
        <div className="flex items-center gap-4 h-full">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-105">
            <Image
              src={contributor.image}
              alt={contributor.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 flex-1">
            <Badge
              className="w-fit bg-[#1a237e] hover:bg-[#1a237e]/90 text-white px-3 py-1 relative z-10"
              variant="secondary"
            >
              {contributor.name}
            </Badge>
            <Link
              href={contributor.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative z-10"
            >
              <Github className="h-4 w-4" />
              <span className="underline-offset-4 group-hover:underline">
                GitHub
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 opacity-0 transition-opacity group-hover:opacity-100 z-[1]" />
    </Card>
  );
} 