##### Entity Lifecycle
![[images/Pasted image 20250423073910.png|600]]

##### Entity Lifecycle
| Operations  | Description                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| **Detach**  | If entity is detached, it is not associated with a Hibernate session               |
| **Merge**   | If instance is detached from session, then merge will reattach to session          |
| **Persist** | Transitions new instances to managed state. Next flush / commit will save in db.   |
| **Remove**  | Transitions managed entity to be removed. Next flush / commit will delete from db. |
| **Refresh** | Reload / synch object with data from db. Prevents stale data                       |


## 1. **비영속 (New/Transient)**
- **정의**: 엔티티가 생성되었지만 아직 영속성 컨텍스트와 연결되지 않은 상태입니다.
- **특징**:
    - JPA와 무관한 순수 자바 객체입니다.
    - 변경 감지(Dirty Checking), 1차 캐시 등 영속성 컨텍스트의 기능이 적용되지 않습니다.
- **예시**
    java
    `Member member = new Member("user1"); // 비영속 상태`

## 2. **영속 (Managed)**
- **정의**: 엔티티가 영속성 컨텍스트에 저장되어 관리되는 상태입니다.
- **특징**:
    - `em.persist()`, `em.find()`, JPQL 쿼리 결과로 영속 상태가 됩니다.
    - **변경 감지**가 활성화되어, 트랜잭션 커밋 시 자동으로 DB에 반영됩니다
    - **1차 캐시**에 저장되며, 동일한 식별자로 조회 시 캐시에서 반환됩니다
- **예시**:
    java
    `em.persist(member); // 영속 상태로 전환`

## 3. **준영속 (Detached)**
- **정의**: 영속 상태의 엔티티가 영속성 컨텍스트에서 분리된 상태입니다.
- **특징**:
    - `em.detach()`, `em.clear()`, `em.close()`로 전환됩니다
    - 변경 감지와 1차 캐시 기능이 비활성화됩니다.
    - **식별자(ID)는 유지**되며, `merge()`를 통해 다시 영속 상태로 복귀할 수 있습니다
- **예시**:
    java
    `em.detach(member); // 준영속 상태로 전환`
    

## 상태 전이 비교

| 상태      | 영속성 컨텍스트 관리 | 변경 감지 | 1차 캐시 | DB 동기화    |
| ------- | ----------- | ----- | ----- | --------- |
| **비영속** | ❌           | ❌     | ❌     | ❌         |
| **영속**  | ✅           | ✅     | ✅     | 트랜잭션 커밋 시 |
| **준영속** | ❌           | ❌     | ❌     | ❌         |

## 4. **삭제 (Removed)**

- **정의**: 엔티티가 영속성 컨텍스트와 데이터베이스에서 삭제된 상태입니다.
- **예시**:
    ```java
    em.remove(member); // 삭제 상태
	```

## **영속성 컨텍스트의 핵심 기능**
1. **1차 캐시**: 영속 상태의 엔티티를 캐시하여 조회 성능 향상
2. **변경 감지 (Dirty Checking)**: 엔티티의 변경 사항을 자동으로 DB에 반영
3. **쓰기 지연 (Transactional Write-Behind)**: INSERT/UPDATE 쿼리를 트랜잭션 커밋 시 한 번에 실행
4. **동일성 보장**: 같은 식별자의 엔티티는 항상 동일한 인스턴스 반환

## 상태 전이 예시 코드
```java
// 비영속 → 영속 
Member member = new Member("user1"); 
em.persist(member);  

// 영속 → 준영속 
em.detach(member);  

// 준영속 → 영속 (병합) 
Member mergedMember = em.merge(member);  

// 영속 → 삭제 
em.remove(mergedMember);
```

## 결론

- **영속성 컨텍스트**는 엔티티의 상태를 관리하며, 효율적인 DB 연산을 지원합니다.
- **비영속**은 JPA와 무관한 상태, **영속**은 관리 대상, **준영속**은 분리된 상태로 이해해야 합니다.
- 상태 전이를 통해 엔티티의 생명주기를 제어할 수 있습니다.