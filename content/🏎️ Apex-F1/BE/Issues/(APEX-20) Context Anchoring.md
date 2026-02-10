---
created: 2026-02-08
dg-publish: true
---
## Issue
```text
Fernando ALONSO} : 0.8598169600854507
Charles LECLERC} : 0.8589560985565247
Lewis HAMILTON} : 0.8579143031682334
Oscar PIASTRI} : 0.8529107570648254
Esteban OCON} : 0.8471368257039713
```
- DB에 2026년 Driver 데이터밖에 없는 상황에서, "Ferrari에 속해있는 Driver를 알려줘"라는 쿼리에 대한 결과
- 상위 2개의 결과를 뽑는 테스트에서, `Fernando Alonso`가 포함되는 이슈 발생


## Cause
- Driver 데이터를 임베딩하여 저장하는 로직에서 사용하는 임베딩 모델이 이미 학습한 사전 지식에 따라, `Fernando Alonso`가 이전에 `Ferrari` 소속이었다는 사실이 유사도 점수를 높게 산출했음


## Solution Candidates
1. DB 데이터만 활용하여 결과를 반환하는 방식
	- Pros: 구현 난이도가 낮음
	- Cons: 검색 자체가 실패하면 틀린 결과를 반환하게 됨
2. DB 검색 결과가 낮으면 모델 지식을 사용하는 방식
	- Pros: DB에 존재하지 않는 일반 상식 답변 가능
	- Cons: "애매하게 높은 점수"에 대한 처리가 곤란함, 즉 기준을 세우기 어려움
3. 데이터/쿼리에 추가적인 맥락 추가
	- Pros: DB에 존재하지 않는 일반 상식 답변 가능
	- Cons: "애매하게 높은 점수"에 대한 처리가 곤란함, 즉 기준을 세우기 어려움


## Solution: Text Enrichment & Context Injection
> - (완성도) 현재의 문제의 원인은 **의미적 모호성**이기 때문에, 데이터에 **시간적 사실**을 고정시키면 과거의 Driver 데이터와 현재의 데이터를 구분 가능
> - (유지보수) 만약 서비스가 의도하는 결과를 반환하기 위하여 별도의 Fallback을 구축하지 않아도 됨

- Driver 데이터에 `Year` 정보를 추가
- `drivers.description` column에도 연도 정보를 추가 (`Season` 추가)
- `DriverMapper`에 `Season` 관련 로직 추가
- `DriverPersistenceAdapter.saveDrivers()`에서 중복 처리 및 `Season` 관련 로직 추가