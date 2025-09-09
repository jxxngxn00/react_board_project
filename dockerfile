# Node.js LTS 이미지
FROM node:20

# 작업 디렉토리
WORKDIR /app

# 루트 package.json, yarn.lock 복사
COPY package.json yarn.lock ./

# backend, frontend 복사
COPY backend ./backend

# COPY backend/.env ./backend/.env
COPY frontend ./frontend

# backend 의존성 설치
WORKDIR /app/backend
RUN yarn install

# frontend 의존성 설치
WORKDIR /app/frontend
RUN yarn install

# 다시 루트로 이동
WORKDIR /app

# 실행 (board 스크립트 -> backend dev -> concurrently)
CMD ["yarn", "board"]
