# Afterburner-Front

![React](https://img.shields.io/badge/React-v18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-v9.1.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-v9.12.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.13-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)


> Afterburner-Frontend 협업가이드

## 🔥 **프로젝트소개 (Introduction)**

<img src="https://github.com/user-attachments/assets/1dd89ce1-9f85-44a4-ad63-5e6192950fad" alt="Afterburner-Logo" width="600" height="auto"><br>

> 우리 어플리케이션은 사용자 친화적인 UI와 관리 편의성을 중점으로 개발된 웹 플랫폼입니다.<br>
> 프론트엔드에서는 **React**를 기반으로 하여 빠른 렌더링과 컴포넌트 재사용성을 극대화하였으며,<br> > **Redux**를 통해 전역 상태 관리를 효율적으로 처리하고 있습니다.<br>
> 또한, **Axios**를 활용하여 백엔드 API와의 원활한 통신을 지원하여 실시간 데이터 반영과 동기화를 쉽게 처리할 수 있습니다.<br>

## 🔥 **Feature**

- **1st Flow**

  - 애플리케이션 소개 페이지: 프로젝트 애플리케이션에 대한 비전과 기능설명, 설치링크등을 제공

  - 어드민 페이지: 어드민 페이지에서는 다양한 데이터 처리와 대시보드 UI를 제공하여 관리자들이 효율적으로 작업을 처리할 수 있도록 설계

- **2nd Flow**

  - 기획 예정입니다.

## 🔥 **시작하기 (Getting Started)**

### 설치 방법

1. **리포지토리 클론:**
   ```bash
   git clone https://github.com/Afterburner2024/Afterburner-Front.git
   ```
2. **프로젝트 디렉토리로 이동:**
   ```bash
   cd afterburner-front
   ```
3. **의존성 설치:**
   ```bash
   npm install
   ```
4. **개발 서버 실행:**
   ```bash
   npm start
   ```
5. **애플리케이션 접속:**
   브라우저에서 `http://localhost:3000`에 접속하여 확인합니다.

## 🔥 **브랜치 전략 (Branch Strategy)**

### 브랜치 네이밍 규칙

- `main` : 안정적인 릴리스 브랜치
- `develop` : 기능들이 병합되는 개발 브랜치
- `feature/{feature-name}` : 새로운 기능을 위한 브랜치
- `fix/{issue-name}` : 버그 수정을 위한 브랜치

### 커밋 메시지 규칙

- **형식**: `[태그]: (변경 사항)`
- **태그 종류**:
  - `feat` : 새로운 기능 추가
  - `fix` : 버그 수정
  - `refactor` : 코드 리팩토링
  - `style` : 코드 스타일 수정 (공백, 세미콜론 등)
  - `docs` : 문서 관련 변경

## 🔥 **코드 스타일 및 품질 (Code Style & Quality)**

> 본 프로젝트는 네이버 ESLint 가이드를 이용합니다

- **ESLint**: Linting 도구로, 코드 품질을 향상시키고 일관성을 유지하기 위해 코드 스타일을 검사합니다.

  - 프로젝트에서는 **eslint-config-naver** 설정을 기반으로 네이버의 코드 스타일 가이드를 준수하고 있습니다.
  - 주요 규칙:
    - **모듈화**: 모든 파일은 적절히 모듈화되어 있어야 하며, 불필요한 의존성을 피해야 합니다.
    - **코드 간결성**: 불필요한 주석 및 공백을 제거하고 코드를 간결하게 유지합니다.
  - Lint를 실행하여 코드 검사를 진행하려면 다음 명령어를 사용하세요:
    ```bash
    npm run lint
    ```

- **Prettier**: 코드 포매팅 도구로, 모든 코드의 스타일을 일관되게 유지하는 데 사용됩니다.

  - 프로젝트에서는 **Prettier**와 **ESLint**를 함께 사용하여 코드 포매팅을 자동으로 적용합니다.
  - 파일을 저장할 때 자동으로 포매팅이 적용되도록 다음과 같은 VS Code 설정을 활성화하세요 (setting.json):

    ```json
    {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      }
    }
    ```

  - 수동으로 모든 파일을 포맷하려면 다음 명령어를 사용하세요:
    ```bash
    npx prettier --write .
    ```

## 🔥 **Tailwind CSS 사용법 (Tailwind CSS)**

- 자세한 Tailwind CSS 사용법과 스타일 가이드는 공식 문서를 참고해 주세요:
- [Tailwind Docs](https://tailwindcss.com/docs/installation)

## 🔥 **폴더 구조 (Folder Structure)**

```bash
afterburner-front/
│
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── store.js                # Redux Store 설정
│   ├── assets/                     # 정적 파일 (이미지, 폰트 등)
│   │   └── logo.svg
│   ├── components/                 # 재사용 가능한 컴포넌트들
│   │   └── Header.js
│   │   └── Footer.js
│   ├── pages/                      # 각 페이지 구성 요소
│   │   ├── HomePage/
│   │   │   ├── HomePage.js         # 홈 페이지 컴포넌트
│   │   │   └── HomePage.css        # 홈 페이지 스타일
│   │   ├── AboutPage/
│   │   │   ├── AboutPage.js        # 소개 페이지 컴포넌트
│   │   │   └── AboutPage.css       # 소개 페이지 스타일
│   │   ├── AdminPage/
│   │   │   ├── AdminPage.js        # 어드민 페이지 컴포넌트
│   │   │   └── AdminPage.css       # 어드민 페이지 스타일
│   ├── services/                   # API 관련 파일
│   │   └── axiosInstance.js
│   ├── styles/                     # 전역 스타일 파일
│   │   └── variables.css           # CSS 변수
│   │   └── global.css              # 전역 스타일
│   ├── utils/                      # 유틸리티 함수 모음
│   │   └── helpers.js              # 공통 헬퍼 함수
│   ├── App.js                      # 최상위 컴포넌트
│   ├── App.css                     # App 스타일 파일
│   ├── index.js                    # 진입점 파일 (ReactDOM.render)
│   ├── index.css                   # index 스타일 파일
│   ├── reportWebVitals.js          # 웹 성능 측정 파일
│   ├── setupTests.js               # 테스트 설정 파일
│   └── .eslintrc.json              # ESLint 설정 파일
│
├── .gitignore                      # Git 무시할 파일들
├── eslint.config.mjs               # ESLint 설정 파일 (모듈 방식)
├── package-lock.json               # npm 의존성 잠금 파일
├── package.json                    # 프로젝트 의존성 설정
├── README.md                       # 프로젝트 설명 파일
└── tailwind.config.js              # Tailwind CSS 설정 파일
```

## 🔥 **테스트 (Testing)**

- **단위 테스트 (Unit Tests)**: Jest와 React Testing Library를 사용해 컴포넌트를 테스트합니다.
  ```bash
  npm test
  ```

## 🔥 **Contributor**

### 1st Contributor

- stjoo0925 | 주순태 | [깃허브](https://github.com/Stjoo0925)

- ppudding3861 | 강형석 | [깃허브](https://github.com/ppudding3861)

## 🔥 Architecture

- 유저 페이지

![front-architecture / user](https://github.com/user-attachments/assets/07da9135-dddb-4cf0-b6ca-a0ec7a5bd379)


- 어드민 페이지

![front-architecture / admin](https://github.com/user-attachments/assets/24d2e814-35d1-41df-928f-3623646d7f46)

## 🔥 Stack

- React: 사용자 인터페이스 개발에 사용되는 자바스크립트 라이브러리로, 컴포넌트 기반으로 구성되어 효율적인 페이지 렌더링을 지원합니다.

- Redux: 전역 상태 관리를 책임지는 라이브러리로, 어플리케이션 상태를 체계적으로 관리하여 복잡한 데이터 흐름을 단순화합니다.
- Axios: HTTP 클라이언트 라이브러리로, API 요청을 간편하게 처리하고 비동기 데이터 처리를 지원합니다.
