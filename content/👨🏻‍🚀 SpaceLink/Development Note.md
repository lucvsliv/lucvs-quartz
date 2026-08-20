---
created: 2026-07-27
dg-publish:
---
#### 2026.07.27.
- [ ] DB/JPA 상에서는 `geometry(Point)` 타입으로 관리 -> 도메인에서는 Mapper를 통하여 위도/경도로 나누어서 사용
- [ ] 최근 30일 이용 건수 쿼리 최적화 방식
	- [ ] `getRecentReservationCount()` 메서드에 `@Cacheable` 달아서 캐싱을 통한 쿼리 재수행 방지
	- [ ] 추후 대시보드 등에서 통계 데이터가 많이 사용될 때 -> 스케줄러 도입 고려 필요
- [ ] 공간 상태가 `PENDING` 일 때 -> FE/BE 에서 모두 공간 수정 방어 로직 필요
	- [ ] BE -> 공간 수정 로직 내에서 공간 상태가 `PENDING`이면 Exception
	- [ ] FE -> 공간 수정 버튼 비활성화 필요

#### 2026.07.30.
- [ ] Aggregate Root인 `Space`에 종속된 하위 엔티티들은 `SpaceMapper`에서 응집도 높게 관리하고, 독립적인 마스터 도메인은 개별 Mapper(`AmenityMapper` 등)로 분리하여 관리