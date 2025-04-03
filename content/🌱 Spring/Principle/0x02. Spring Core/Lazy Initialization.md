---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Lazy Initialization
---
Spring Application 이 시작되고 난 뒤에 Spring 은, 더 정확하게 말하면 ApplicationContext 가 모든 Bean 에 대한 instance 를 생성하고, initialize 한다.

Lazy Initialization 은 모든 Bean 을 실행 초기에 initialize 하는 것이 아니라, DI 등과 같은 explicit 한 request 가 있을 때 ApplicationContext 가 Bean 을 생성하고 initialize 하는 것이다. Application 의 startup 시간을 빠르게 할 수 있는 장점이 존재한다. 동작 순서는 다음과 같다.

> 1. `/dailywork` endpoint 에 접근
> 2. `FootballCoach` 에 대한 instance 를 이 때 생성
> 3. 이후 `DemoController` 에 대한 instance 를 생성하고 `FootballCoach` 를 inject

사용 방법은 단순히 Lazy Initialization 을 시키고 싶은 Bean 의 class 에 `@Lazy` annotation 을 추가하면 된다. 모든 Bean 들에 대하여 Lazy 를 설정하고 싶을 때는 어떻게 할까? 

물론 Bean 이 적으면 모든 class 에 대하여 `@Lazy` annotation 을 설정해주면 되지만, 아니라면 약간의 무식한 노동이 필요할 것이다. 이에 Spring 은 global configuration 하는 방법을 제공하는데, `application.properties` 파일에 `spring.main.lazy-initialization=true` codeline 을 추가해주면 된다.

##### Disadvatages
Lazy Initialization 은 Appilication 의 시작 시간을 단축하고, 사용하지 않는 Bean 은 생성하지 않음으로 메모리 소비를 줄일 수 있는 등의 장점이 존재한다.

하지만 다음의 단점이 존재한다.

- 1. **문제 발견 지연**
    - Bean이 요청될 때까지 초기화되지 않으므로, 잘못된 설정이나 의존성 문제는 애플리케이션 실행 중에야 발견될 수 있음
2. **첫 요청 시 지연**
    - Bean이 처음 사용될 때 초기화가 이루어지므로, 첫 번째 요청 시 성능 저하가 발생할 수 있음
3. **복잡한 의존성 관리**
    - 여러 Lazy Bean이 서로 의존하는 경우, 의존성 그래프가 복잡해지고 순환 의존성 문제가 발생할 수 있음
4. **고부하 상황에서 성능 저하**
    - 초기화가 필요한 Bean이 많은 경우, 동시에 여러 요청이 들어오면 초기화 작업이 몰려 성능 병목 현상 발생 가능

따라서 premature optimization 의 함정에 빠지면 안 된다. 이에 개발자는 Application 의 구조와 요구사항을 잘 파악하여 적절히 활용해야 한다.

> ### “Premature optimization is the root of all evil”
> Donald Knuth

##### Lazy Initialization - Test
우선 다시 `@Qualifier` 를 사용하는 방식으로 바꾸고, 각 Bean 들의 constructor 에 Bean 의 이름을 출력하도록 만들었다. Application 을 실행해보자.

![[images/스크린샷 2025-04-01 11.14.30.png]]

보면 ApplicationContext 가 Bean 들을 생성하고 initialize 하여 각 Bean 에 해당하는 출력을 볼 수 있다.

이제 `BasketballCoach` 만 Lazy Bean 으로 지정하자.
```java
@Component  
@Lazy  
public class BasketballCoach implements Coach { ... }
```

Application 을 실행해보면,

![[images/스크린샷 2025-04-01 11.24.31.png]]

위와 같이 `BaseballCoach` Bean 만 제외하고 initialized 된 것을 볼 수 있다.

global 하게 Lazy Initialization 을 적용하면 console 에서는 어떻게 출력이 발생할까? `application.properties` 를 통하여 global Lazy Initialization 을 설정하고 console 을 살펴보면 다음과 같다. 

![[images/스크린샷 2025-04-01 11.38.27.png]]

ApplicationContext 가 intialized 된 이후에 ApplicationContext 를 통해서 바로 Bean 을 생성하고 initialize 하는 것이 아니라, Application 이 실행된 이후에 `/workout` endpoint 에 접근할 때 Bean 이 생성되고 initialized 된 것을 알 수 있다.