import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Award, Users, BookOpen } from "lucide-react";
import { getStackColor } from "@/utils/stackColors";

interface MonthlyDeveloper {
  id: number;
  name: string;
  role: string;
  avatar: string;
  achievements: string[];
  mainStacks: string[];
  githubUrl: string;
  projects: number;
  mentoring: number;
}

interface MonthlyDevelopersProps {
  developers: MonthlyDeveloper[];
}

export function MonthlyDevelopers({ developers }: MonthlyDevelopersProps) {
  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🌟 이달의 개발자
          </h3>
          <Badge variant="secondary" className="text-xs">
            1월 선정
          </Badge>
        </div>

        <div className="space-y-6">
          {developers.map((dev, index) => (
            <div key={dev.id} className="space-y-4">
              {/* 개발자 기본 정보 */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={dev.avatar} alt={dev.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {dev.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {dev.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-[#a0a0a0]">
                        {dev.role}
                      </p>
                    </div>
                    <a
                      href={dev.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-600 dark:text-[#a0a0a0]" />
                    </a>
                  </div>

                  {/* 통계 */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <BookOpen className="w-3 h-3" />
                      <span>{dev.projects}개 프로젝트</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <Users className="w-3 h-3" />
                      <span>{dev.mentoring}명 멘토링</span>
                    </div>
                  </div>

                  {/* 주요 기술스택 */}
                  <div className="flex flex-wrap gap-1">
                    {dev.mainStacks.map((stack) => (
                      <Badge
                        key={stack}
                        className={`text-xs ${getStackColor(stack)}`}
                      >
                        {stack}
                      </Badge>
                    ))}
                  </div>

                  {/* 성과 */}
                  <div className="space-y-1">
                    {dev.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-center gap-2 text-xs text-gray-600 dark:text-[#a0a0a0]"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {index < developers.length - 1 && (
                <div className="border-t border-gray-100 dark:border-[#333333]" />
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-[#333333]">
          <p className="text-xs text-gray-500 dark:text-[#666666] text-center">
            활발한 참여와 기여를 통해 선정된 이달의 개발자들입니다
          </p>
        </div>
      </div>
    </Card>
  );
}
