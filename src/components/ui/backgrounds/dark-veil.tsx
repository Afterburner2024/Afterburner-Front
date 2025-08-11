import React from "react";

/**
 * DarkVeil: 어두운 배경 위에 은은한 컬러 오라를 더해 깊이를 주는 배경.
 * - 다크 모드에서만 보이도록 처리됨 (light 모드에서는 표시 안 함)
 * - 스크롤 콘텐츠 아래 레이어로 깔리도록 absolute 배치
 *
 * 참고: reactbits Dark Veil 배경 아이디어 기반
 */
export function DarkVeil() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
      {/* 컬러 오라들 */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 h-[560px] w-[560px] rounded-full bg-emerald-500/15 blur-3xl" />

      {/* 비네팅(가장자리 어둡게) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(0,0,0,0),rgba(0,0,0,0.35))]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_120%_20%,rgba(0,0,0,0),rgba(0,0,0,0.4))]" />

      {/* 베일 레이어 (미세한 어두운 막) */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

export default DarkVeil;
