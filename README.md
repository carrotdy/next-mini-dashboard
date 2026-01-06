# Next Mini Dashboard

간단한 건강 기록(걸음/수면/기분/공황)을 관리하는 Next.js 앱입니다.

## Demo
- Production URL: https://next-mini-dashboard.vercel.app

## Features
- 기록 목록: 검색(q), 카테고리 필터, 정렬(recent/oldest), 페이지네이션
- 기록 작성/수정/삭제 (Server Actions)
- Toast UX: created/updated/deleted 쿼리 감지 → 토스트 표시 → 쿼리 제거
- 대시보드: 최근 기록/지표 표시

## Tech Stack
- Next.js (App Router)
- TypeScript
- Prisma + PostgreSQL
- Tailwind CSS
- react-hot-toast

## Getting Started (Local)

### 1) Install
```bash
pnpm install