import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  user: {
    name: string;
    image?: string;
    github?: string;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-[120px]">
      <CardHeader className="p-4 h-full">
        <div className="flex items-center gap-4 h-full">
          <Avatar className="w-16 h-16 border-2 border-border transition-transform group-hover:scale-105">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-2 flex-1">
            <Badge
              className="w-fit bg-[#1a237e] hover:bg-[#1a237e]/90 text-white px-3 py-1"
              variant="secondary"
            >
              {user.name}
            </Badge>
            {user.github && (
              <Link
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="underline-offset-4 group-hover:underline">
                  GitHub
                </span>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  );
}
