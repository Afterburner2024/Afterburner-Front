export interface Comment {
  id: number;
  user: string;
  avatar?: string;
  content: string;
  timestamp: Date;
}

export interface AttendanceData {
  date: Date;
  attendees: string[];
  comments: Comment[];
}
