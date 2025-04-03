---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Bean Scopes
---
Spring 에서 Bean Scope 는 Spring Container 가 관리하는 Bean 의 생존 범위를 정의한다. 더 정확하게는 Bean 이 생성되고 소멸되는 시점과 그 동안에 유지되는 범위를 설정하는 것이다.

우선 default scope 는 singleton 이다. 여기서 Spring 에서의 singleton 에 대하여 한번 짚고 넘어가자.

> ###### Singleton
> - Spring Container 가 단 하나의 Bean instance 만을 생성
> - memory 에 cached 됨
> - Bean 에 대한 모든 dependency 는 모두 같은 Bean 을 reference 함

##### 1. Singleton (기본 스코프)
- **특징**: Application 전체에서 단 하나의 instance 만 생성
- **생존 범위**: Spring Container 시작부터 종료까지 유지
- **사용 예시 (Explicit)**: `@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)`

##### 2. Prototype
- **특징**: Request 마다 새로운 Bean instance 를 생성
- **생존 범위**: 초기화 후 Spring Container 가 더 이상 관리하지 않으며, 소멸 메서드도 호출되지 않음
- **사용 예시**: `@Scope(ConfigurableBeanFactory.SCOPE_PROTOT)` or `@Scope("prototype")`

##### 3. Request
- **특징**: HTTP Request 마다 새로운 Bean instance 를 생성, 오직 Web App 에서만 사용됨
- **생존 범위**: 요청이 끝날 때까지 유지
- **사용 예시**: `@Scope(value="request", proxyMode=ScopedProxyMode.TARGET_CLASS)`

##### 4. Session
- **특징**: HTTP session 마다 새로운 Bean instance 를 생성, 역시 Web App 에서만 사용됨
- **생존 범위**: 세션 종료 시까지 유지
- **사용 예시**: `@Scope("session")`

##### 5. Application
- **특징**: ServletContext의 생명 주기 동안 단일 instance 를 유지, 역시 Web App 에서만 사용됨
- **생존 범위**: Web Application 종료 시까지 유지
- **사용 예시**: `@Scope("application") `

##### 6. WebSocket
- **특징**: WebSocket 연결마다 새로운 Bean instance 를 생성, 역시 Web App 에서만 사용됨
- **생존 범위**: WebSocket 연결 종료 시까지 유지

##### Bean Scope - Test
scope 를 어떻게 설정하느냐에 따라서 실제 Bean instance 가 어떻게 생성되는지를 테스트해보자.

먼저 아래와 같이 추가적인 field 를 생성하고, 이를 Qualifier 를 통하여 `footballCoach` 의 Bean 을 Injection 받는 것으로 하자.

```java
// define a private field for the dependency  
private Coach myCoach;  
private Coach anotherCoach;  
  
// define a constructor for dependency injection  
@Autowired  
public DemoController(  
        @Qualifier("footballCoach") Coach theCoach,  
        @Qualifier("footballCoach") Coach theAnotherCoach) {  
    System.out.println("In constructor: " + getClass().getSimpleName());  
    myCoach = theCoach;  
    anotherCoach = theAnotherCoach;  
}
```

그리고 아래와 같이, 두 개의 field 가 같은 Bean instance 를 reference 하는지를 검사하는 테스트 endpoint 를 하나 설정해두었다.

```java
@GetMapping("/check")  
public String check() {  
    return "Comparing beans: myCoach == anotherCoach -> " + (myCoach == anotherCoach);  
}
```

우선 Default Scope 에서는 singleton pattern 을 유지하기 때문에 `true` 로 나올 것이다.

![[스크린샷 2025-04-01 17.23.21.png]]

예상대로 잘 나온 것을 볼 수 있다. 이번에는 Prototype Scope 로 설정하여 테스트해보자. Prototype 은 Request 마다 새로운 Bean instance 가 생성되므로 `false` 가 나올 것이다.

![[스크린샷 2025-04-01 17.22.52.png]]

예상대로 `false` 가 잘 나온 것을 볼 수 있다.