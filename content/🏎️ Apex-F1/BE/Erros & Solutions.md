---
created: 2026-02-02
dg-publish: true
---
#### vector로 선언된 column 관련 오류
> ERROR: column "embedding" is of type vector but expression is of type character varying
- 설명: JPA(Hibernate)는 Entity 필드 타입이 `String`이면, Application에서 DB에 데이터를 보낼 때 `VARCHAR` 타입 파라미터로 자동 바인딩되어 타입 정보도 같이 넘어가기 때문에 충돌 발생
- 해결: custom type을 하나 만들어서 PostgreSQL의 vector type인 PGObject와 Kotlin의 FloatArray가 정상적으로 변환될 수 있도록 조정


#### pgvector extension 미설치 관련 오류
> Error executing DDL "()" via JDBC \[ERROR: type "vector" does not exist Position: 195]
- 설명: Hibernate가 `drivers` 테이블을 생성하려고 했으나, PostgreSQL에서 `vector`라는 타입을 인식할 수 없어서 오류 발생, pgevector extension이 존재하지 않아서 발생
- 해결: `application.yml` 설정에서 `spring.ai.pgvector.initialize-schema: true` 옵션을 추가하여 스키마를 초기화 (DB에서 `CREATE EXTENSION IF NOT EXISTS vector;` 쿼리를 사용한 것과 같은 효과)