# 1단계: 프론트 빌드
FROM node:18 as builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# 2단계: 백엔드 실행 + 프론트 정적 파일 제공
FROM node:18
WORKDIR /app

# 백엔드 설치
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# 소스 복사
COPY backend ./backend

# 프론트 빌드 결과물을 백엔드 public 폴더에 넣기
COPY --from=builder /app/frontend/build ./backend/public

WORKDIR /app/backend
EXPOSE 3001
CMD ["yarn", "dev"]