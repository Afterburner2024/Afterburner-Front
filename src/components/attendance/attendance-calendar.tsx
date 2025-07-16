"use client";

import { Card } from "@/components/ui/card";
import Calendar from "react-calendar";
import { useResponsive } from "@/hooks/useResponsive";
import {
  formatDay,
  formatShortWeekday,
  formatMonthYear,
  formatMonth,
  formatYear,
} from "@/utils/calendarUtils";

// Calendar CSS import
import "@/assets/css/calendar.css";

interface AttendanceCalendarProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function AttendanceCalendar({
  date,
  onChange,
}: AttendanceCalendarProps) {
  const { isMobile } = useResponsive();

  return (
    <section className="flex flex-col items-center space-y-4">
      <Card className="p-6 w-full max-w-4xl shadow-lg bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) {
              onChange(value);
            }
          }}
          value={date}
          locale="ko"
          className="w-full border-none calendar-modern"
          formatDay={(locale, date) => formatDay(isMobile, date)}
          formatShortWeekday={(locale, date) =>
            formatShortWeekday(isMobile, date)
          }
          formatMonthYear={(locale, date) => formatMonthYear(isMobile, date)}
          formatMonth={(locale, date) => formatMonth(isMobile, date)}
          formatYear={(locale, date) => formatYear(isMobile, date)}
        />
      </Card>
    </section>
  );
}
