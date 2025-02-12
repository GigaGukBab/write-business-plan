# 5minDocs - AI 사업계획서 작성 서비스

5분 만에 완성하는 사업계획서 작성 서비스 부분입니다.

## 시작하기

### 환경 설정

1. 저장소 클론

```bash
git clone [repository-url]
cd write-business-plan
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 각 환경 변수를 프로젝트 설정에 맞게 입력해주세요.

```env
# 데이터베이스 설정
DATABASE_PORT=          # 데이터베이스 포트 (원하는 포트 번호)
DATABASE_USERNAME=      # 데이터베이스 사용자 이름
DATABASE_PASSWORD=      # 데이터베이스 비밀번호
DATABASE_NAME=          # 데이터베이스 이름 (하이픈(-) 사용 X)
ROOT_PASSWORD=          # 데이터베이스 루트 비밀번호
```

### 개발 서버 실행

```bash
npm run dev
```
