"use client";

import { User } from "@/types/user";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStackColor } from "@/utils/stackColors";
import {
  MapPin,
  Building,
  Link as LinkIcon,
  Github,
  Mail,
  Phone,
  Calendar,
  Users,
  BookOpen,
  Edit,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserProfileCardProps {
  user: User;
  isOwner?: boolean;
  onEditProfile?: () => void;
}

export function UserProfileCard({
  user,
  isOwner = false,
  onEditProfile,
}: UserProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
      <div className="space-y-6">
        {/* 상단: 프로필 이미지와 기본 정보 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              {user.userImage ? (
                <Image
                  src={user.userImage}
                  alt={user.userName}
                  width={96}
                  height={96}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user.userName.charAt(0)}
                </div>
              )}
            </Avatar>

            {/* 소셜 프로바이더 배지 */}
            {user.socialProvider && (
              <div className="absolute -bottom-1 -right-1">
                <Badge
                  className={`text-xs px-1.5 py-0.5 ${
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

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.userName}
            </h1>

            {/* GitHub 사용자명 */}
            {user.githubUsername && (
              <p className="text-gray-600 dark:text-[#a0a0a0] font-mono text-sm">
                @{user.githubUsername}
              </p>
            )}

            {/* 소개글 */}
            {user.bio && (
              <p className="text-gray-700 dark:text-[#cccccc] text-sm leading-relaxed max-w-sm">
                {user.bio}
              </p>
            )}
          </div>

          {/* 편집 버튼 */}
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
              className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            >
              <Edit className="w-4 h-4" />
              프로필 편집
            </Button>
          )}
        </div>

        {/* 정보 섹션 */}
        <div className="space-y-3 text-sm">
          {/* 회사 */}
          {user.company && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <Building className="w-4 h-4 flex-shrink-0" />
              <span>{user.company}</span>
            </div>
          )}

          {/* 위치 */}
          {user.location && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{user.location}</span>
            </div>
          )}

          {/* 이메일 */}
          {user.showEmail && user.userEmail && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a
                href={`mailto:${user.userEmail}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {user.userEmail}
              </a>
            </div>
          )}

          {/* 전화번호 */}
          {user.showPhone && user.userPhoneNumber && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{user.userPhoneNumber}</span>
            </div>
          )}

          {/* 블로그 */}
          {user.blogUrl && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <LinkIcon className="w-4 h-4 flex-shrink-0" />
              <a
                href={user.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
              >
                {user.blogUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {/* GitHub */}
          {user.githubUrl && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
              <Github className="w-4 h-4 flex-shrink-0" />
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                github.com/{user.githubUsername}
              </a>
            </div>
          )}

          {/* 가입일 */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-[#a0a0a0]">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(user.registeredAt)} 가입</span>
          </div>
        </div>

        {/* GitHub 통계 */}
        {user.githubUsername &&
          (user.followers !== undefined ||
            user.following !== undefined ||
            user.publicRepos !== undefined) && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                GitHub 활동
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {user.publicRepos !== undefined && (
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.publicRepos}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Repositories
                    </p>
                  </div>
                )}
                {user.followers !== undefined && (
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.followers}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Followers
                    </p>
                  </div>
                )}
                {user.following !== undefined && (
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.following}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-[#a0a0a0]">
                      Following
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* 기술 스택 */}
        {user.userTechStacks && user.userTechStacks.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              기술 스택
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {user.userTechStacks.map((stack, index) => (
                <Badge
                  key={index}
                  className={`text-xs ${getStackColor(
                    stack
                  )} inline-flex items-center h-6`}
                >
                  <span className="leading-none">{stack}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
