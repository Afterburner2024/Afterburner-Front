<img src="https://github.com/user-attachments/assets/a1ed491e-a6f8-4c6c-8ef4-0d2cd6c495da" alt="Afterburner-Logo" width="245" height="auto"><br>

![Next.js](https://img.shields.io/badge/Next.js-v15.3.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-v18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.14-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-v8.57.1-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

> 국비교육 수료생을 위한 커뮤니티 플랫폼 - Afterburner Frontend

## 🔥 **프로젝트 소개 (Introduction)**

> Afterburner는 국비교육 수료생들을 위한 커뮤니티 플랫폼입니다.<br>
> **Next.js 15**를 기반으로 한 현대적인 웹 애플리케이션으로, **TypeScript**로 타입 안정성을 확보하고<br>
> **shadcn/ui** 컴포넌트 라이브러리를 활용하여 일관되고 접근성 높은 UI를 제공합니다.<br>
> **App Router**를 사용한 파일 기반 라우팅과 서버 컴포넌트를 통해 최적화된 성능을 구현했습니다.<br>

## 🔥 **주요 기능 (Features)**

### 🎯 **커뮤니티 기능**

- **출석 게시판**: 매일 출석 체크와 커뮤니티 소통
- **팀원 모집**: 프로젝트 팀원 모집 및 협업
- **프로젝트 일지**: 개발 경험과 학습 기록 공유
- **Afterburner 소개**: 플랫폼 정보 및 참여자 프로필

### 🎨 **사용자 경험**

- **다크/라이트 테마**: 사용자 환경에 맞는 테마 전환
- **반응형 디자인**: 모바일과 데스크톱 최적화
- **접근성**: WCAG 가이드라인 준수
- **모바일 네비게이션**: 터치 친화적인 사이드 메뉴

## 🔥 **기술 스택 (Tech Stack)**

### **Frontend**

- **Next.js 15**: App Router, Server Components, Image Optimization
- **React 18**: Concurrent Features, Suspense, Error Boundaries
- **TypeScript**: 정적 타입 검사 및 개발 생산성 향상
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **shadcn/ui**: Radix UI 기반 컴포넌트 라이브러리

### **개발 도구**

- **ESLint**: TypeScript 및 Next.js 규칙 적용
- **Prettier**: 코드 포매팅 자동화
- **Lucide React**: 일관된 아이콘 시스템

## 🔥 **시작하기 (Getting Started)**

### 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저

### 설치 방법

1. **리포지토리 클론:**

   ```bash
   git clone https://github.com/Afterburner2024/Afterburner-Front.git
   ```

2. **프로젝트 디렉토리로 이동:**

   ```bash
   cd Afterburner-Front
   ```

3. **의존성 설치:**

   ```bash
   npm install
   ```

4. **개발 서버 실행:**

   ```bash
   npm run dev
   ```

5. **애플리케이션 접속:**
   브라우저에서 `http://localhost:3000`에 접속하여 확인합니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 검사
npm run lint
```

## 🔥 **프로젝트 구조 (Project Structure)**

```bash
Afterburner-Front/
├── public/                        # 정적 파일 (이미지, 아이콘 등)
│   ├── images/                    # 프로젝트 이미지 파일들
│   ├── favicon.ico                # 파비콘
│   └── manifest.json              # PWA 매니페스트
├── src/                           # 소스 코드
│   ├── app/                       # Next.js App Router 디렉토리
│   │   ├── globals.css            # 전역 스타일
│   │   ├── layout.tsx             # 루트 레이아웃
│   │   ├── page.tsx               # 홈 페이지
│   │   ├── attendance/            # 출석 게시판 페이지
│   │   ├── recruitment/           # 팀원 모집 페이지
│   │   ├── project-log/           # 프로젝트 일지 페이지
│   │   └── afterburner/           # Afterburner 소개 페이지
│   ├── components/                # 재사용 컴포넌트
│   │   ├── ui/                    # shadcn/ui 기본 컴포넌트
│   │   ├── layouts/               # 레이아웃 컴포넌트
│   │   ├── header.tsx             # 헤더 컴포넌트
│   │   ├── footer.tsx             # 푸터 컴포넌트
│   │   └── side-nav.tsx           # 사이드 네비게이션
│   ├── lib/                       # 유틸리티 함수
│   │   └── utils.ts               # 공통 유틸리티
│   └── assets/                    # 정적 자산
│       └── css/                   # 추가 스타일 파일
├── components.json                # shadcn/ui 설정
├── tailwind.config.ts             # Tailwind CSS 설정
├── next.config.js                 # Next.js 설정
├── tsconfig.json                  # TypeScript 설정
├── eslint.config.mjs              # ESLint 설정
└── package.json                   # 프로젝트 메타데이터 및 의존성
```

## 🔥 **개발 가이드 (Development Guide)**

### 컴포넌트 개발

- **shadcn/ui** 컴포넌트를 우선 사용
- 커스텀 컴포넌트는 `src/components/` 에 위치
- TypeScript 인터페이스 정의 필수

### 스타일링

- **Tailwind CSS** 유틸리티 클래스 사용
- 커스텀 스타일은 `src/assets/css/` 에 위치
- 다크 테마 지원을 위한 CSS 변수 활용

### 라우팅

- **App Router** 파일 기반 라우팅 사용
- 페이지는 `src/app/` 디렉토리에 위치
- 레이아웃 컴포넌트로 공통 UI 관리

## 🔥 **브랜치 전략 (Branch Strategy)**

### 브랜치 네이밍 규칙

- `main` : 안정적인 릴리스 브랜치
- `develop` : 기능들이 병합되는 개발 브랜치
- `feat/{feature-name}` : 새로운 기능을 위한 브랜치
- `fix/{issue-name}` : 버그 수정을 위한 브랜치

### 커밋 메시지 규칙

- **형식**: `[태그]: (변경 사항)`
- **태그 종류**:
  - `feat` : 새로운 기능 추가
  - `fix` : 버그 수정
  - `refactor` : 코드 리팩토링
  - `style` : 코드 스타일 수정
  - `docs` : 문서 관련 변경
  - `chore` : 기타 작업

## 🔥 **코드 품질 (Code Quality)**

### ESLint 설정

- Next.js 및 TypeScript 규칙 적용
- React Hooks 규칙 포함
- 접근성 규칙 적용

### TypeScript 설정

- 엄격한 타입 검사 활성화
- 절대 경로 import 지원 (`@/` 접두사)

### VS Code 설정 권장

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🔥 **향후 계획 (Roadmap)**

### 개발 예정 기능

- [ ] 사용자 인증 시스템 (NextAuth.js)
- [ ] 데이터베이스 연동 (Supabase)
- [ ] 실시간 댓글 시스템
- [ ] 출석 통계 및 스트릭
- [ ] 프로필 커스터마이징
- [ ] 알림 시스템

### 기술적 개선

- [ ] PWA 구현
- [ ] 이미지 최적화
- [ ] 성능 모니터링
- [ ] 테스트 자동화

## 🔥 **Contributor**

### 1st Contributor

- stjoo0925 | 주순태 | [깃허브](https://github.com/Stjoo0925)
- ppudding3861 | 강형석 | [깃허브](https://github.com/ppudding3861)

## 🔥 **라이센스 (License)**

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---
