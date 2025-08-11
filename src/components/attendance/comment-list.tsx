import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Comment } from "@/types/attendance";
import { Reveal } from "@/components/ui/reveal";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment, idx) => (
        <Reveal key={comment.id} delayMs={idx * 50}>
          <Card className="p-4 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333] hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                {comment.avatar ? (
                  <AvatarImage
                    src={comment.avatar}
                    alt={`${comment.user}의 아바타`}
                  />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-[#333333] dark:text-[#ffffff]">
                    {comment.user.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-[#ffffff]">
                    {comment.user}
                  </h4>
                  <time className="text-xs text-gray-500 dark:text-[#a0a0a0]">
                    {format(comment.timestamp, "MM월 dd일 HH:mm", {
                      locale: ko,
                    })}
                  </time>
                </div>
                <p className="text-gray-700 dark:text-[#ffffff] text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
