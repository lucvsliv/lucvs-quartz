---
created: 2025-06-14
updated: 2025-06-14
dg-publish: true
title: Architecture - 거시 관점과 미시 관점
---
## 거시적 관점에서의 구조와 동작 흐름
##### 기본 환경에서의 구조
![[images/Pasted image 20250615001715.png]]

우선 Spring Security Dependency 가 없는 기본적인 환경에서의 구조를 살펴보자. 

위의 그림과 같이, client 의 요청이 Web Context 단에서의 Filter 들을 통과한 뒤, Spring Context 의 Controller 에 도달하게 된다.


##### Spring Security Dependency 가 추가된 구조
![[images/Pasted image 20250616004437.png]]

Spring Security Dependency 가 적용된 환경에서는 위와 같은 구조를 가진다.

WAS-level Filter Chain 에 새로운 Filter 를 등록하여 넣고, 해당 필터에서 request 를 가로채는 방식이다. 이 request 는 Spring Container 내부에 구현된 Spring Security Logic 을 거친 뒤, 다시 WAS-level Filter 의 다음 Filter 로 되돌아온다.


## 미시적 관점에서의 구조와 동작 흐름
내부적으로는 어떻게 구성되어 있는지 살펴보자.

##### DelegatingFilterProxy
우선 `DelegatingFilterProxy` 는 Spring Security 를 위하여 WAS-level Filter Chain 에 새로이 등록되는 Filter 이다. 

자세하게 들어가보자. `SecurityFilterAutoConfiguration` class 에는 `@AutoConfiguration` annotation 을 사용하고 있고, `DelegatingFilterProxy` Filter 등록에 대한 configuration 을 담당한다. 이렇게 `@AutoConfiguration` annotation 이 달려 있는 class 들은 `ApplicationContext` 를 통하여 Bean 으로 등록되고 관리된다.

![[images/Pasted image 20250615043222.png|400]]

더 깊이 들어가서 `SecurityFilterAutoConfiguration` class 의 `securityFilterChainRegistration()` method 에서는, `"springSecurityFilterChain"` 라는 이름으로 등록된 Bean 을 위 그림과 같이 `DelegatingFilterProxy` 로 wrapping 하여 `FilterChain` 에 새로운 Filter 를 등록한다. 

이렇게 등록된 Filter 가 앞에서 언급했듯이, request 를 가로채서 Security Logic 을 수행시키고 다음 Filter 에 다시 넘겨주게 된다.

이때 사용된 "springSecurityFilterChain" 라는 것은, `FilterChainProxy` 라는 또다른 Filter 가 Bean 으로 등록되었을 때 사용되는 default name 이다. 해당 Filter 는 Spring Security 가 자체적으로 등록한다.

##### FilterChainProxy
왜 굳이 "springSecurityFilterChain" 라는 이름의 `FilterChainProxy` Bean 을 `DelegatingFilterProxy` 라는 class 로 wrapping 하여 사용하는 것일까?

`FilterChainProxy` 는 Spring Bean 이기 때문에 WAS, 즉 Servlet Container 단에서 직접 인식할 수 없다. Servlet Container 가 인식할 수 있는 Filter 와, Spring Container 가 관리하는 Bean 은 서로 다른 Life-Cycle 과 관리 범위를 갖기 때문이다. 따라서 `DelegatingFilterProxy` 를 통해 `FilterChainProxy` 를 Wrapping 하여 사용하고, `FilterChainProxy` 에게 request 에 대한 처리 권한을 위임(Delegating) 한다.

![[images/Pasted image 20250615030200.png|420]]

또한 위와 같이 여러 개의 `SecurityFilterChain` 을 구성하여, request 에 따라 `FilterChainProxy` 가 적절한 Security Filter Chain 을 선택하여 실행하게 만들 수 있다. 실제 구현에서는 `FilterChainProxy` 가 `SecurityFilterChain` 을 List 형식으로 들고 있고, `getFilters(HttpServletRequest request)` method 를 통하여 request 에 해당하는 `SecurityFilterChain` 을 return 하는 방법으로 적절한 `SecurityFilterChain` 을 선택한다.

##### SecurityFilterChain
하나의 `SecurityFilterChain` 은 여러 개의 Security Filter 들을 포함하며, 각각의 Security Filter 에서 CSRF, 로그인/로그아웃, 인가 등의 여러 작업을 수행한다.