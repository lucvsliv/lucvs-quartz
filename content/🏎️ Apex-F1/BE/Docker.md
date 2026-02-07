---
created: 2026-01-14
dg-publish: true
---
## Docker

###### 기존 컨테이너 & 볼륨 삭제 (초기화)
```shell
docker compose -f .docker/docker-compose.yml down -v
```

###### `.env` 적용하여 docker 실행
```shell
docker compose --env-file .env -f .docker/docker-compose.yml up -d
```

###### 로그 확인
```shell
docker logs -f apex-f1-postgres
```