import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
  newComment: string;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

export function CommentForm({
  newComment,
  onCommentChange,
  onSubmit,
}: CommentFormProps) {
  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
      <div className="space-y-4">
        <Textarea
          placeholder="오늘 하루는 어떠셨나요? 자유롭게 이야기해보세요! 💭"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="min-h-[100px] resize-none bg-white border-gray-300 dark:border-[#333333] text-gray-900 placeholder:text-gray-800"
        />
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-[#00ff88] dark:hover:bg-[#00cc6a] text-white dark:text-[#0a0a0a] px-6"
          >
            등록하기
          </Button>
        </div>
      </div>
    </Card>
  );
}
