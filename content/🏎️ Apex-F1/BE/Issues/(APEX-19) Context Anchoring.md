---
created: 2026-02-08
dg-publish: true
---
## Issue
- DB에 2026년 Driver 데이터밖에 없는 상황에서, "Ferrari에 속해있는 Driver를 알려줘"라는 쿼리 결과에 `Fernando Alonso`가 포함되는 이슈 발생

## Cause
- Driver 데이터를 임베딩하여 저장하는 로직에서 사용하는 임베딩 모델