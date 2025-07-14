import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="flex h-14 w-full items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            © 2024 - {new Date().getFullYear()} Afterburner. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/Afterburner2024"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
