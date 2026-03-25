---
created: 2026-03-22
---
### 🚀 [APEX-F1] AWS EC2 기반 풀스택 도커 배포 요약

**1. 인프라 프로비저닝 (AWS EC2)**

- `t2.micro` (Ubuntu) 인스턴스를 생성하고, 안정적인 빌드를 위해 Swap 메모리를 설정했습니다.
    
- 보안 그룹(Security Group)을 통해 외부 접속을 위한 80(프론트엔드), 8080(백엔드 API) 포트를 개방했습니다.
    

**2. 백엔드 (Spring Boot + PostgreSQL + Redis) 배포**

- `docker-compose.yml` (공통)과 `docker-compose.override.yml` (운영/로컬 환경 분리)을 활용하여 프로페셔널한 아키텍처를 구성했습니다.
    
- `.env` 파일을 통해 데이터베이스 비밀번호와 외부 설정값들을 안전하게 주입했습니다.
    

**3. 프론트엔드 (Next.js) 배포**

- `standalone` 빌드 옵션을 적용하여, 무거운 `node_modules` 없이 가볍고 빠른 운영 전용 도커 이미지를 구축했습니다.
    
- 백엔드와 프론트엔드의 `docker-compose`를 분리하여 서로 독립적으로 배포 및 관리가 가능한 마이크로서비스 형태를 갖췄습니다.
    

---

### 💥 트러블슈팅 하이라이트 (이슈 요약)

**🔥 이슈 1: Tailwind CSS v4와 Alpine Linux 충돌 (프론트엔드 빌드)**

- **현상:** 도커 환경에서 Next.js를 빌드할 때, Tailwind의 Rust 기반 엔진(Oxide) 바이너리를 찾지 못하는 에러(`ERESOLVE`, `Cannot find module`)가 지속적으로 발생했습니다.
    
- **원인:** 가벼운 `alpine` 리눅스(`musl` 라이브러리)와 최신 Tailwind v4 터보팩 빌드 환경 간의 호환성 버그, 그리고 `package-lock.json`의 OS 캐싱 문제였습니다.
    
- **해결:** 기본 베이스 이미지를 `node:18-slim` (데비안 계열)으로 변경하고, 도커 안에서 `npm install`을 새로 돌려 해당 OS에 맞는 바이너리를 직접 다운로드하도록 유도하여 해결했습니다.
    

**🔥 이슈 2: 프론트엔드 도커의 환경변수(URL) 누락**

- **현상:** 도커로 띄운 프론트엔드에서 API를 호출할 때, 지정해 둔 EC2 퍼블릭 IP가 아닌 로컬호스트 주소로 요청이 날아가는 문제가 발생했습니다.
    
- **원인:** Next.js의 `NEXT_PUBLIC_` 환경 변수는 런타임(서버 실행 시)이 아닌 **빌드 타임(Build-time)**에 코드에 삽입되어야 하는데, 도커 실행 시점에만 변수를 넘겨주었기 때문입니다.
    
- **해결:** 프론트엔드 `docker-compose.yml`의 `build.args` 속성을 통해 빌드하는 순간에 `NEXT_PUBLIC_API_URL` 값을 명시적으로 주입하여 해결했습니다.
    

**🔥 이슈 3: 백엔드 CORS (403 Forbidden) 차단**

- **현상:** 프론트엔드에서 회원가입 API 등을 호출하면 403 CORS 에러가 발생했습니다.
    
- **원인:** 백엔드 `CorsConfigurationSource`에 허용된 도메인이 `localhost`로 고정되어 있었고, 도커 명령어(`--env-file`)로 전달한 환경변수가 실제 컨테이너 내부의 스프링 부트 애플리케이션까지 도달하지 않았습니다.
    
- **해결:** CORS 설정을 환경변수화 하여 유연하게 만들고 (`[APEX-59]`), `docker-compose.override.yml`에 `env_file:` 옵션을 직접 명시하여 컨테이너 내부로 설정값을 성공적으로 주입했습니다.