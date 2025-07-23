"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { getStackColor } from "@/utils/stackColors";
import { MapPin, Building, Github, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileCardProps {
  user: User;
  showTechStacks?: boolean;
  compact?: boolean;
}

export function ProfileCard({
  user,
  showTechStacks = true,
  compact = false,
}: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });
  };

  if (compact) {
    return (
      <Link href={`/profile/${user.userId}`}>
        <Card className="p-4 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] hover:shadow-lg transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              {user.userImage ? (
                <Image
                  src={user.userImage}
                  alt={user.userName}
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                  {user.userName.charAt(0)}
                </div>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {user.userName}
              </h3>
              {user.bio && (
                <p className="text-sm text-gray-600 dark:text-[#a0a0a0] line-clamp-1">
                  {user.bio}
                </p>
              )}
              {user.company && (
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#666666] mt-1">
                  <Building className="w-3 h-3" />
                  <span className="truncate">{user.company}</span>
                </div>
              )}
            </div>

            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-[#666666] flex-shrink-0" />
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/profile/${user.userId}`}>
      <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="space-y-4">
          {/* 상단: 프로필 이미지와 기본 정보 */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                {user.userImage ? (
                  <Image
                    src={user.userImage}
                    alt={user.userName}
                    width={64}
                    height={64}
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {user.userName.charAt(0)}
                  </div>
                )}
              </Avatar>

              {/* 소셜 프로바이더 배지 */}
              {user.socialProvider && (
                <div className="absolute -bottom-1 -right-1">
                  <Badge
                    className={`text-xs px-1 py-0.5 ${
                      user.socialProvider === "github"
                        ? "bg-gray-800 text-white"
                        : user.socialProvider === "google"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {user.socialProvider}
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {user.userName}
                </h3>

                {/* GitHub 사용자명 */}
                {user.githubUsername && (
                  <p className="text-gray-600 dark:text-[#a0a0a0] font-mono text-sm">
                    @{user.githubUsername}
                  </p>
                )}
              </div>

              {/* 소개글 */}
              {user.bio && (
                <p className="text-gray-700 dark:text-[#cccccc] text-sm leading-relaxed line-clamp-2">
                  {user.bio}
                </p>
              )}
            </div>

            <ExternalLink className="w-5 h-5 text-gray-400 dark:text-[#666666] flex-shrink-0" />
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-2 text-sm">
            {/* 회사 */}
            {user.company && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
                <Building className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{user.company}</span>
              </div>
            )}

            {/* 위치 */}
            {user.location && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{user.location}</span>
              </div>
            )}

            {/* GitHub */}
            {user.githubUrl && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
                <Github className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  github.com/{user.githubUsername}
                </span>
              </div>
            )}

            {/* 가입일 */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{formatDate(user.registeredAt)} 가입</span>
            </div>
          </div>

          {/* 기술 스택 */}
          {showTechStacks &&
            user.userTechStacks &&
            user.userTechStacks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  기술 스택
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.userTechStacks.slice(0, 6).map((stack, index) => (
                    <Badge
                      key={index}
                      className={`text-xs ${getStackColor(stack)}`}
                    >
                      {stack}
                    </Badge>
                  ))}
                  {user.userTechStacks.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.userTechStacks.length - 6}
                    </Badge>
                  )}
                </div>
              </div>
            )}

          {/* GitHub 통계 (간단 버전) */}
          {user.githubUsername &&
            (user.followers !== undefined ||
              user.publicRepos !== undefined) && (
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-[#333333]">
                {user.publicRepos !== undefined && (
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.publicRepos}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Repos
                    </p>
                  </div>
                )}
                {user.followers !== undefined && (
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.followers}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Followers
                    </p>
                  </div>
                )}
                {user.following !== undefined && (
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.following}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Following
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>
      </Card>
    </Link>
  );
}
