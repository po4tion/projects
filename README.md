<h1 align="center">Welcome to PORTFOLIO 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/yarn-%3E%3D1.22.5-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D8.1.0-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> 김동규의 포트폴리오

### 🏠 [PORTFOLIO로 이동](https://portfolio-po4tion.vercel.app/)

## 목차

1. [PORTFOLIO](#PORTFOLIO)
2. [설명](#설명)
3. [브랜치 관리 전략](#브랜치-관리-전략)
4. [사용 기술](#사용-기술)
5. [배포 환경과 테스트 환경](#배포-환경과-테스트-환경)
6. [제공 기능](#제공-기능)
7. [파일 관리](#파일-관리)
8. [개발자](#개발자)
9. [제보사항](#제보사항)

## PORTFOLIO

개인 포트폴리오 용도로 제작한 Next.js 기반의 웹사이트입니다. SEO 적용을 위해 Next.js를 선택했고 Vercel로 배포를 완료하였습니다. 또한 TypeScript와 TailWind CSS 적응에 집중하며 UX/UI의 중요성을 알 수 있었던 프로젝트입니다.

## 설명

- Next.js를 통해 SEO 적용
- TailWind CSS를 통해 웹 UI 전체 페이지 적용(반응형 웹 적용)
- TypeScript의 정적타입 정의를 통해 사전 에러 방지
- Cypress를 통해 사용자 관점에서 테스트 완료

## 브랜치 관리 전략

- Git-flow 방법론 사용

| 브랜치  | 목적                                            |
| ------- | ----------------------------------------------- |
| master  | 도메인으로 배포하는 브랜치                      |
| develop | 작업이 완료된 기능들을 merge하는 브랜치         |
| feature | 단위 기능을 개발하는 브랜치                     |
| release | 배포 전 테스트를 하기 위한 브랜치               |
| hotfix  | 배포 후 버그 발생 시, 긴급 수정하기 위한 브랜치 |

## 사용 기술

- React.js
- Next.js
- TypeScript
- TailWind CSS
- react-typed
- react-tsparticles
- react-icons

## 배포 환경과 테스트 환경

- 배포 환경 : Vercel
- 테스트 환경 : Cypress

## 제공 기능

1. 홈
2. 자기소개
3. 보유 기술
4. 포트폴리오
5. 연락방법

## 파일 관리

| 파일명     | 목적                    |
| ---------- | ----------------------- |
| components | PORTFOLIO의 UI 컴포넌트 |
| helpers    | 중요 데이터 관리        |
| pages      | 페이지 렌더링           |
| public     | images favicon robots   |
| cypress    | E2E 테스트              |

## 개발자

👤 **Kim DongGyu <po4tion0429@gmail.com>**

- Github: [@po4tion](https://github.com/po4tion)

## 제보사항

PORTFOLIO 이용시 불편사항/불만사항 또는 오류가 발생했을 시 아래 페이지로 제보 부탁드립니다.<br> [issues page](https://github.com/po4tion/portfolio/issues)
