"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Users,
  Calendar,
  ExternalLink,
  Github,
  User,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { mockPosts } from "@/data/mockData";
import { RecruitmentPost, Applicant } from "@/types/recruitment";
import { getStackColor } from "@/utils/stackColors";
import {
  formatDDay,
  getStatusLabel,
  getStatusColorClass,
  calculateDynamicStatus,
} from "@/utils/statusUtils";
import {
  ApplicationModal,
  ApplicationFormData,
} from "@/components/recruitment/application-modal";
import { MainLayout } from "@/components/layouts/main-layout";

export default function RecruitmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const [post, setPost] = useState<RecruitmentPost | undefined>(
    mockPosts.find((p) => p.id === id)
  );

  const [showApplyModal, setShowApplyModal] = useState(false);

  if (!post) {
    return (
      <MainLayout>
        <div className="min-h-svh bg-gray-50 dark:bg-[#171515]">
          <div className="flex flex-col space-y-8 p-6">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-[#a0a0a0] mb-4">
                  요청하신 모집글을 찾을 수 없습니다.
                </p>
                <Button onClick={() => router.back()}>뒤로가기</Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const dynamicStatus = calculateDynamicStatus(post);
  const statusLabel = getStatusLabel(dynamicStatus);
  const statusColorClass = getStatusColorClass(dynamicStatus);
  const dDayText = formatDDay(post.deadline);
  const isCompleted = dynamicStatus === "completed";
  const isUrgent = dynamicStatus === "urgent";

  const handleApply = () => {
    setShowApplyModal(true);
  };

  const handleApplicationSubmit = (applicationData: ApplicationFormData) => {
    // TODO: 실제 신청 로직 구현 (API 호출)
    console.log("Application submitted:", applicationData);
    alert("신청이 완료되었습니다!");
  };

  const getApplicantStatusIcon = (status: Applicant["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Hourglass className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getApplicantStatusText = (status: Applicant["status"]) => {
    switch (status) {
      case "accepted":
        return "승인됨";
      case "rejected":
        return "거절됨";
      default:
        return "검토중";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-svh bg-gray-50 dark:bg-[#171515]">
        <div className="flex flex-col space-y-8 p-6">
          {/* 뒤로가기 버튼 */}
          <div className="w-full max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
          </div>

          {/* 프로젝트 정보 카드 */}
          <section className="w-full max-w-7xl mx-auto">
            <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
              {/* 상태 및 마감일 */}
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`inline-flex items-center rounded-md px-2 sm:px-2.5 py-0.5 text-xs font-semibold ${statusColorClass}`}
                >
                  {statusLabel}
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-[#a0a0a0]">
                    {dDayText}
                  </span>
                  <div className="text-xs text-gray-400 dark:text-[#666666] mt-1">
                    {format(parseISO(post.deadline), "yyyy년 MM월 dd일", {
                      locale: ko,
                    })}
                  </div>
                </div>
              </div>

              {/* 제목 */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={
                      post.type === "project"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    }
                  >
                    {post.type === "project" ? "🚀 프로젝트" : "📚 스터디"}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-[#ffffff]">
                  {post.title}
                </h1>
              </div>

              {/* 기본 정보 */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-[#a0a0a0]">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>모집인원 {post.memberCount}명</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>작성자: {post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    작성일:{" "}
                    {format(parseISO(post.createdAt), "yyyy.MM.dd", {
                      locale: ko,
                    })}
                  </span>
                </div>
              </div>

              {/* 내용 */}
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-[#cccccc] leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {/* 기술 스택 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#ffffff] mb-3">
                  기술 스택
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {post.stacks.map((stack, index) => (
                    <div
                      key={index}
                      className={`text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-md font-medium ${getStackColor(
                        stack
                      )}`}
                    >
                      {stack}
                    </div>
                  ))}
                </div>
              </div>

              {/* 신청 버튼 */}
              {!isCompleted && (
                <div className="flex justify-center">
                  <Button size="lg" className="px-8" onClick={handleApply}>
                    프로젝트 신청하기
                  </Button>
                </div>
              )}
            </Card>
          </section>

          {/* 신청자 목록 */}
          <section className="w-full max-w-7xl mx-auto">
            <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-[#ffffff]">
                  신청자 목록
                </h2>
                <Badge variant="secondary">
                  {post.applicationCount || 0}명 신청
                </Badge>
              </div>

              {post.applicants && post.applicants.length > 0 ? (
                <div className="space-y-4">
                  {post.applicants.map((applicant) => (
                    <Card
                      key={applicant.id}
                      className="p-4 bg-gray-50 dark:bg-[#0a0a0a]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {/* 프로필 사진 */}
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={applicant.avatar}
                              alt={`사용자 ${applicant.userId || applicant.id}`}
                            />
                            <AvatarFallback>
                              #{applicant.userId || applicant.id}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            {/* 사용자 ID와 상태 */}
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-[#ffffff]">
                                사용자 #{applicant.userId || applicant.id}
                              </h4>
                              <div className="flex items-center gap-1">
                                {getApplicantStatusIcon(applicant.status)}
                                <span className="text-xs text-gray-500 dark:text-[#a0a0a0]">
                                  {getApplicantStatusText(applicant.status)}
                                </span>
                              </div>
                            </div>

                            {/* 자기소개 */}
                            <p className="text-sm text-gray-600 dark:text-[#a0a0a0] mb-3">
                              {applicant.introduction}
                            </p>

                            {/* 기술 스택 */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {applicant.skills.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs px-1.5 sm:px-2 py-0.5"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* 링크들 */}
                            <div className="flex gap-4 text-xs">
                              {applicant.githubUrl && (
                                <a
                                  href={applicant.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  <Github className="w-3 h-3" />
                                  GitHub
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              {applicant.portfolioUrl && (
                                <a
                                  href={applicant.portfolioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  포트폴리오
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 신청일 */}
                        <div className="text-xs text-gray-400 dark:text-[#666666] text-right">
                          {format(parseISO(applicant.appliedAt), "MM.dd", {
                            locale: ko,
                          })}{" "}
                          신청
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 dark:text-[#666666] mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-[#a0a0a0]">
                    아직 신청한 팀원이 없습니다.
                  </p>
                </div>
              )}
            </Card>
          </section>

          {/* 신청 모달 */}
          <ApplicationModal
            isOpen={showApplyModal}
            onClose={() => setShowApplyModal(false)}
            onSubmit={handleApplicationSubmit}
            projectTitle={post.title}
            projectType={post.type}
          />
        </div>
      </div>
    </MainLayout>
  );
}
