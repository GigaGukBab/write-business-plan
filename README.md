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
DATASOURCE_TYPE=          # 데이터베이스 유형 (mysql)
DATASOURCE_HOST=          # 데이터베이스 호스트 주소
DATASOURCE_PORT=          # 데이터베이스 포트 (원하는 포트 번호)
DATASOURCE_USERNAME=      # 데이터베이스 사용자 이름
DATASOURCE_PASSWORD=      # 데이터베이스 비밀번호
DATASOURCE_DATABASE_NAME= # 데이터베이스 이름

# Docker MySQL 설정
DB_CONTAINER_NAME=   # 실행할 mySql Docker 컨테이너 이름
MYSQL_VERSION=       # MySQL 버전 (8.0)
```

### 개발 서버 실행

```bash
npm run dev
```
