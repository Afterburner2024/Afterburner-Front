"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  House,
  CalendarCheck,
  Handshake,
  NotebookPen,
  SquareCode,
} from "lucide-react";

const sidebarNavItems = [
  {
    id: "home",
    title: "Home",
    icon: <House className="w-4 h-4" />,
    href: "/",
  },
  {
    id: "attendance",
    title: "출석 게시판",
    icon: <CalendarCheck className="w-4 h-4" />,
    href: "/attendance",
  },
  {
    id: "recruitment",
    title: "팀원모집",
    icon: <Handshake className="w-4 h-4" />,
    href: "/recruitment",
  },
  {
    id: "project-log",
    title: "프로젝트 일지",
    icon: <NotebookPen className="w-4 h-4" />,
    href: "/project-log",
  },
  {
    id: "afterburner",
    title: "Afterburner",
    icon: <SquareCode className="w-4 h-4" />,
    href: "/afterburner",
  },
];

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    id: string;
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SideNav({
  className,
  items = sidebarNavItems,
  ...props
}: SideNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "transparent"
          )}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.title}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
