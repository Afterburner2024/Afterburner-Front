# Afterburner-Front

![React](https://img.shields.io/badge/React-v18.3.1-61DAFB?logo=react&logoColor=white)

> Afterburner-Frontend 협업가이드

## 🔥 **프로젝트소개 (Introduction)**

<img src="https://github.com/user-attachments/assets/1dd89ce1-9f85-44a4-ad63-5e6192950fad" alt="Afterburner-Logo" width="600" height="auto"><br>

> 우리 어플리케이션은 사용자 친화적인 UI와 관리 편의성을 중점으로 개발된 웹 플랫폼입니다.<br>
> 프론트엔드에서는 **React**를 기반으로 하여 빠른 렌더링과 컴포넌트 재사용성을 극대화하였으며,<br> > **Redux**를 통해 전역 상태 관리를 효율적으로 처리하고 있습니다.<br>
> 또한, **Axios**를 활용하여 백엔드 API와의 원활한 통신을 지원하여 실시간 데이터 반영과 동기화를 쉽게 처리할 수 있습니다.<br>

## 🔥 **시작하기 (Getting Started)**

### 설치 방법

1. **리포지토리 클론:**
   ```bash
   git clone https://github.com/your-repository-url.git
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

- **Linting**: 프로젝트에서는 **ESLint**를 사용하여 일관된 코드 스타일을 유지합니다. 코드를 커밋하기 전에 반드시 Lint를 실행해 오류를 수정하세요.
  ```bash
  npm run lint
  ```

## 🔥 **폴더 구조 (Folder Structure)**

## 🔥 **테스트 (Testing)**

- **단위 테스트 (Unit Tests)**: Jest와 React Testing Library를 사용해 컴포넌트를 테스트합니다.
  ```bash
  npm test
  ```

## 🔥 **Feature**

- **1st Flow**

  - 애플리케이션 소개 페이지: 프로젝트 애플리케이션에 대한 비전과 기능설명, 설치링크등을 제공

  - 어드민 페이지: 어드민 페이지에서는 다양한 데이터 처리와 대시보드 UI를 제공하여 관리자들이 효율적으로 작업을 처리할 수 있도록 설계

- **2nd Flow**

  - 기획 예정입니다.

## 🔥 **Contributor**

### 1st Contributor

- stjoo0925 | 주순태 | [깃허브](https://github.com/Stjoo0925)

- ppudding3861 | 강형석 | [깃허브](https://github.com/ppudding3861)

## 🔥 Architecture

![front-architecture](https://github.com/user-attachments/assets/9792b0b9-ba4c-421f-be82-f1d2dc3e514b)

## 🔥 Stack

- React: 사용자 인터페이스 개발에 사용되는 자바스크립트 라이브러리로, 컴포넌트 기반으로 구성되어 효율적인 페이지 렌더링을 지원합니다.

- Redux: 전역 상태 관리를 책임지는 라이브러리로, 어플리케이션 상태를 체계적으로 관리하여 복잡한 데이터 흐름을 단순화합니다.
- Axios: HTTP 클라이언트 라이브러리로, API 요청을 간편하게 처리하고 비동기 데이터 처리를 지원합니다.

## 🔥 Browser Support

| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                               null                                                                               |                                                                                  null                                                                                   |                                                                             null                                                                             |                                                                               null                                                                               |                                                                                null                                                                                |
