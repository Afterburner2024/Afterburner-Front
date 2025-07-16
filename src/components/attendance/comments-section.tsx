import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { Comment } from "@/types/attendance";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

export function CommentsSection({
  comments,
  onAddComment,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: "익명",
      content: newComment,
      timestamp: new Date(),
    };

    onAddComment(comment);
    setNewComment("");
  };

  return (
    <section className="w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-[#ffffff]">
        오늘의 한마디 😛
      </h2>

      {/* 댓글 입력 */}
      <CommentForm
        newComment={newComment}
        onCommentChange={setNewComment}
        onSubmit={handleSubmit}
      />

      {/* 댓글 목록 */}
      <CommentList comments={comments} />
    </section>
  );
}
