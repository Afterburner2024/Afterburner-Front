"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends PropsWithChildren {
  as?: ElementType;
  className?: string;
  /** 요소가 보이기 시작할 때까지의 지연 시간 (ms) */
  delayMs?: number;
  /** 초기 세로 오프셋(px). 기본 12 */
  offsetY?: number;
  /** 한 번만 실행할지 여부. 기본 true */
  once?: boolean;
}

/**
 * 스크롤 진입 시 부드럽게 노출되는 래퍼. 레이아웃에 영향 없이 시각 효과만 부여.
 */
export function Reveal({
  as: Component = "div",
  className,
  children,
  delayMs = 0,
  offsetY = 12,
  once = true,
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // 사용자 접근성(감소된 모션) 고려: 애니메이션 비활성화
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delayMs);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs, once]);

  return (
    <Component
      ref={elementRef as any}
      className={cn(
        // 초기 상태: 살짝 내려간 상태 + 투명
        "will-change-[opacity,transform] transition-all duration-700 ease-out",
        "motion-reduce:transition-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
      style={{ transform: isVisible ? undefined : `translateY(${offsetY}px)` }}
    >
      {children}
    </Component>
  );
}

export default Reveal;
