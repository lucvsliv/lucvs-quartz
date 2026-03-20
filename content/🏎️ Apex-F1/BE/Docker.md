---
created: 2026-01-14
dg-publish: true
---

## Docker 띄우기
- 로컬용 (`.env`, `docker-compose.yml`, `docker-compose.test.yml` 적용)
```bash
docker compose --env-file .env -f .docker/docker-compose.yml -f .docker/docker-compose.override.yml up -d
```


## Docker 중지
###### 컨데이터 중지
```shell
docker compose --env-file .env -f .docker/docker-compose.yml -f .docker/docker-compose.override.yml down
```

###### 중지 + 볼륨 삭제 (초기화)
```shell
docker compose --env-file .env -f .docker/docker-compose.yml -f .docker/docker-compose.override.yml down -v
```


## Docker 로그
###### 로그 확인
```shell
docker logs -f apex-f1-postgres
```


### Alias
```bash
alias dcup='docker compose --env-file .env -f .docker/docker-compose.yml -f .docker/docker-compose.override.yml up -d'

alias dcdown='docker compose --env-file .env -f .docker/docker-compose.yml -f .docker/docker-compose.override.yml down'
```