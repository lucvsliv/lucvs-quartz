---
created: 2025-01-19
dg-home: true
---
## Data Class, Class
Hexagonal Architecture 패턴을 적용할 때, 도메인 모델과 요청/응답 DTO는 Data Class를 사용한다. 물론 일반적인 Kotlin Class를 이용할 수도 있지만, Boilerplate를 컴파일러 위치에서 효율적으로 관리할 수 있기 때문에 Data Class가 자주 사용된다.

하지만 JPA를 사용하는 환경에서, Persistence Layer의 Entity Class는 Data Class로 선언할 수 없다. 왜 그럴까?


## Reason #1. Proxy
JPA(Hibernate)는 성능을 위하여 아주 영리하게 동작한다. 만약 `주문(Order)` 정보를 조회하려고 할 때, 주문한 `사용자(User)` 데이터는 당장 필요하지 않을 것이다. 이때, Hibernate는 일단 `User` 자리에는 가짜 객체(Proxy)를 넣어놓고, 나중에 진짜 필요하면 그때 DB에서 가져온다. 지연 로딩(Lazy Loading) 방식이다.

Proxy Class는 원본 Class를 상속받아서 필드값은 비어 있는 껍데기만 같은 자식 Class로 만들어진다. 하지만 Kotlin의 Data Class는 기본적으로 `final` Class, 즉 상속이 불가능한 Class이다.

이렇게 되면, Proxy Class가 생성되지 않기 때문에 모든 데이터를 즉시 로딩(Eager Loading)을 통하여 가져오게 된다. 만약 데이터가 많아질 경우, 이는 엄청난 성능 문제로 이어질 수 있다.


## Reason #2. Hashcode
Kotlin Data Class는 생성자에 정의된 모든 필드를 사용하여 `hashcode()`를 자동 생성한다. 

만약 두 Entity A, B가 서로를 참조하고 있다면, 만약 `a.hashcode()`이 호출되었을 때, A의 필드에 속해있는 B의 Hashcode를 얻기 위하여 다시 `b.hashcode()`가 호출되고, B의 필드에 속해있는 A의 Hashcode를 얻기 위하여 또다시 `a.hashcode()`가 호출되는, 그야말로 무한루프가 생성되어 `StackOverFlowError`가 발생할 수 있다.


## Reason #3. Identity vs State
JPA에서는 Entity들을 `HashSet`에 담아서 관리한다.

만약 Data Class를 사용하여 Entity를 만들었다고 가정하자. 해당 Entity 객체를 하나 생성하면, Data Class는 모든 필드를 섞어서 `hashCode()`를 만들고, 이 값에 따라 `HashSet`의 특정 위치(Bucket)에 담기게 된다.

이후 비즈니스 로직에서 `user.name = "James"`와 같이 필드값을 변경하게 되면 문제가 발생한다. 첫째, `hashCode`가 변한다. Data Class는 변경된 필드까지 포함해 해시코드를 재계산하므로, 이 객체는 엉뚱한 해시값을 가지게 된다. 즉, `HashSet`은 이 객체를 엉뚱한 방(Bucket)에서 찾으려 시도하게 된다.

둘째, `equals()`마저 실패한다. 설령 우연히 해시값이 같거나 전체를 탐색한다 해도, Data Class의 `equals()`는 "모든 필드 값이 같아야 같은 객체"라고 판단(State Comparison)한다. JPA는 "ID(PK)가 같으면 같은 객체"라고 인식(Identity Comparison)해야 하는데, Data Class는 내용물이 바뀌었으니 "다른 객체"라고 판결을 내려버리는 것이다.

결국, 필드 값 하나만 바꿔도 이 객체는 영영 찾을 수 없게 된다. 객체를 삭제하려 해도 `remove(user)`가 동작하지 않는다.

이는 마치 Dangling Pointer와 반대되는 문제와 같다. Dangling Pointer는 포인터는 있는데 실체(메모리)가 사라진 것이라면, 이 문제는 객체는 Heap 메모리에 아주 건강하게 살아있으나, `HashSet`이 "그런 사람 없는데요?"라며 접근을 거부하여 Garbage Collection 대상에서도 제외되고 영원히 메모리 공간만 차지하는 유령(Memory Leak)이 되는 것이다.


## Persistence Context
이처럼 두 가지 측면에서 큰 오류가 발생할 수 있다.

JPA는 DB에서 데이터를 꺼낼 때, 바로 주지 않고 Persistence Context라는 1차 캐시에 저장하고 관리한다. 똑같은 데이터를 또 달라고 하면 다시 DB 접근까지 가지 않고 캐싱할 수 있는 효율성을 위함이다.

또한 Persistence Context가 내부적으로 Entity를 관리할 때, `hashCode()`와 `equals()`가 미친듯이 사용된다. 따라서 Entity에서의 Data Class 사용은 "Persistence Context에서의 오류를 야기"한다고 하는 것이다.


## all-open Plugin
만약 `data class`로 Entity를 만들었다면 컴파일 단계에서는 아무런 문제 없이 진행될 것이다. 하지만 런타임 중에 Hibernate가 프록시를 만들려다가 실패하고, 서버가 오류 메시지를 내뿜으며 죽을 것이다.

그런데 Spring Boot 프로젝트를 만들어서 테스트해보면 아무리 `data class`로 Entity를 만들어도 서버가 다운되지 않는 현상을 목격할 것이다. 동작 과정에 대하여 좀 더 자세히 살펴보자.

`build.gradle`에 이런 설정이 자동으로 들어가있는 것을 볼 수 있다.

```kotlin
plugins {
    kotlin("plugin.spring") version "1.x.x" // all-open 포함
    kotlin("plugin.jpa") version "1.x.x"    // no-arg 포함
}
```

이 [`all-open`](https://kotlinlang.org/docs/all-open-plugin.html) 플러그인(Kotlin에서는 `kotlin-spring`)이 무슨 짓을 하냐면, 컴파일 과정에서 `@Entity`가 붙은 클래스를 발견하면 강제로 `open`을 붙여버린다. 심지어 그게 `data class`일지라도 바이트코드 레벨에서 열어버린다.

- **소스 코드:** `data class User` (코드 상에서는 `final`)
- (플러그인 개입) -> `final` 삭제
- **컴파일된 결과물:** `public open class User` (바이트코드는 `open`)

결과적으로, Hibernate는 "이 클래스 `open`이네? 상속받아서 프록시 만들어야지!" 하고 신나게 프록시 객체를 생성한다.

>응? 근데 Koltin Class는 기본적으로 모두 `final`이지 않은가?

그렇다. 모든 클래스에 `open` 키워드를 붙이는 수고를 한다면, 적어도 프록시 문제에서는 위의 플러그인이 불필요할 것이다.

하지만 Data Class가 자동 생성하는 `equals()`는 매우 엄격한데, `this.javaClass == other.javaClass`와 같이 클래스 타입도 검사한다. 원본 엔티티 클래스와 프록시 클래스는 엄연히 다른 클래스이므로, Data Class를 쓰면 ID가 같아도 `equals()`가 `false`를 반환하는 치명적인 버그가 발생하여 영속성 컨텍스트가 정상 작동하지 않는다.

정리하면 다음과 같다. 

`data class`는 `final`이라 본디 프록시를 생성하지 못하지만, `kotlin-spring` 플러그인이 강제로 `open`시켜서 프록시를 만든다. 프록시는 만들어졌지만, `data class`의 `equals()`는 같은 클래스만 인정하기 때문에 프록시를 거부하는 모순적인 상황이 발생한다.

## Use PK
따라서 Entity는 절대 `data class`로 만들지 않는다.

또한 JPA Entity를 일반 `class`로 만들 때는, `equals()`와 `hashCode()`를 가변적인 필드들로 만들면 안 된다. 변하지 않는 식별자, 즉 Primary Key(PK)로만 구성하여 Overriding하여야 한다.
