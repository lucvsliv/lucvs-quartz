---
created: 2026-02-02
dg-publish: true
---
###### vector로 선언된 column 관련 오류
> ERROR: column "embedding" is of type vector but expression is of type character varying
- 설명: JPA(Hibernate)는 Entity 필드 타입이 `String`이면, Application에서 DB에 데이터를 보낼 때 `VARCHAR` 타입 파라미터로 바인딩되어 타입 정보도 같이 넘어가기 때문에 충돌 발생
- 해결: custom type을 하나 만들어서 PostgreSQL의 vector type인 PGObject와 Kotlin의 FloatArray가 정상적으로 변환될 수 있도록 조정