---
created: 2025-06-14
updated: 2025-06-17
dg-publish: true
title: Architecture - SecurityFilterChain 등록
---
이번에는 `SecurityFilterChain` 의 등록 과정에 대하여 분석해보자.

##### Default SecurityFilterChain
Spring Security 에 대한 Dependency 를 설정하면 기본적인 `SecurityFilterChain` 이 하나 생성된다.

![[../../images/Pasted image 20250616010230.png]]

[[🌱-Spring/Spring Security/Architecture - 거시 관점과 미시 관점|이전 글]]에서 `FilterChainProxy` 는 `SecurityFilterChain` 들을 `List` 형태로 관리한다고 했다. 실제로 구현을 살펴보면 위와 같이 `List` 로 되어있는 것을 볼 수 있다.

`FilterChainProxy.class` 에서 `getFitlers()` method 에 breakpoint 를 걸고 Debug 모드로 실행하고, 간단한 request 를 보내보면 아래와 같이 `filterChains` 의 `size` 가 `1`, 즉 기본적으로 하나의 `SecurityFilterChain` 이 존재하는 것을 볼 수 있다.

![[images/Pasted image 20250616010923.png]]


##### Custom SecurityFilterChain
이번에는 Custom `SecurityFilterChain` 에 대하여 알아보자.

Custom `SecurityFilterChain` 을 등록하는 방법은 `SecurityConfig` class 를 직접 구성하는 것이다.

```java
@Bean  
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	// Filter Chains ...
	return http.build();
}
```

위와 같이 `SecurityFilterChain` type 의 Bean 을 define 하여 Custom `SecurityFilterChain` 을 등록할 수 있으며, 여러 개를 define 하여 여러 개의 `SecurityFilterChain` 을 등록할 수 있다. 여러 개를 등록할 경우, 아래와 같이 `size` 가 늘어난 것을 볼 수 있다.

![[images/Pasted image 20250617210352.png]]

```java
private List<SecurityFilterChain> filterChains;
```

또한 위에서 언급한 것처럼 `FilterChainProxy` 는 여러 개의 `SecurityFilterChain` 들을 `List` 형태로 관리하는데, index 의 순서는 `@Order(n)` 을 통하여 명시적으로 지정하지 않는 이상 등록 순서는 보장이 되지 않는다.

## Multi-SecurityFilterChain 환경
여러 개의 `SecurityFilterChain` 이 존재하는 환경에서는 어떤 기준으로 특정 `SecurityFilterChain` 을 선택하여 request 를 전달하는 것일까? 우선은 다음 기준을 따른다.

> 1. 등록된 index 순
> 2. Filter Chain 에 대한 `RequestMatcher` 값의 일치 여부

`RequestMatcher` 는 들어오는 request 의 URL, HTTP Method, Header 등을 기준으로 matching 하여, 해당 request 에만 Security Rule 을 적용할 수 있게 도와주는 데에 사용되는 Interface 이다.

`RequestMatcher` 는 주로 다음과 같은 상황에서 사용한다.

1. `securityMatcher`: `SecurityFilterChain` 이 아예 적용될 request 의 경로를 지정
2.  `authorizeHttpRequests()`: 이미 `SecurityFilterChain` 이 적용된 request 들 중에서, 각 경로나 권한 등의 조건별로 Authorization 규칙을 세부적으로 지정, 주로 `.requestMatchers()` 를 사용하여 조건을 설정

##### 문제 상황
```java
@Bean
public SecurityFilterChain adminChain(HttpSecurity http) throws Exception {  
    http  
            .authorizeHttpRequests((auth) -> auth  
                    .requestMatchers("/admin").permitAll());  
  
    return http.build();  
}  
  
@Bean  
public SecurityFilterChain publicChain(HttpSecurity http) throws Exception {  
    http  
            .authorizeHttpRequests((auth) -> auth  
                    .requestMatchers("/user").permitAll());  
  
    return http.build();  
}
```

우선 위와 같이 두 개의 `SecurityFilterChain` 을 등록했다고 가정해보자. 각각 `requestMatchers()` 를 사용하여 하나는 `/admin` 경로에, 다른 하나는 `/user` 경로에 대한 request 를 처리하도록 되어 있는 것 같다.

그러나 `securityMatcher` 를 사용하지 않는다면 해당 `SecurityFilterChain` 은 `/**`, 즉 모든 request 경로에 대하여 적용된다. 위와 같이 모든 `SecurityFilterChain` 이 `securityMatcher` 를 사용하지 않고 있다면, `FilterChainProxy` 가 관리하는 `SecurityFilterChain` 들 중, index 가 더 작은 `SecurityFilterChain` 이 선택된다. 더 쉽게 말하면 `/admin` 으로 request 를 받던, `/user` 로 request 를 받던 모두 index 가 더 작은 `SecurityFilterChain` 이 적용된다는 뜻이다.

만약 `adminChain` 이 index `0` 에 등록되어 있다면, `/user` 경로에 대하여 request 를 보내도 `adminChain` 이 적용될 것이다. 해당 `SecurityChainFilter` 에는 `/user` 경로에 대한 별도의 처리 과정이 명시되어 있지 않으므로 `/user` request 는 무시될 것이다.

다행히 최신 버전의 Spring Security(6.x) 에서는 여러 개의 `SecurityFilterChain` 를 define 할 때, 각 Chain 이 어떤 request 에 적용될지 명시적으로 지정하지 않으면, 즉 `securityMatcher` 를 사용하지 않으면 Application 실행에서 오류를 발생시킨다.

##### 해결
```java
@Bean  
public SecurityFilterChain adminChain(HttpSecurity http) throws Exception {  
    http  
            .securityMatcher("/admin")  
            .authorizeHttpRequests((auth) -> auth  
                    .requestMatchers("/admin").permitAll());  
  
    return http.build();  
}  
  
@Bean  
public SecurityFilterChain publicChain(HttpSecurity http) throws Exception {  
    http  
            .securityMatcher("/user")  
            .authorizeHttpRequests((auth) -> auth  
                    .requestMatchers("/user").permitAll());  
  
    return http.build();  
}
```

이 문제에 대한 해결은 간단하다. 각 `SecurityFilterChain` 에 대하여 `securityMatcher` 를 사용하여 적용될 request 의 경로를 명시적으로 지정하면 된다.

##### 등록 순서를 보장하는 방법
```java
@Bean
@Order(1)
public SecurityFilterChain adminChain(HttpSecurity http) throws Exception {  
	// ...
    return http.build();  
}  
  
@Bean
@Order(2)
public SecurityFilterChain publicChain(HttpSecurity http) throws Exception {  
	// ...
    return http.build();  
}
```

앞서 여러 개의 `SecurityFilterChain` 을 등록하면 순서가 보장되지 않는다고 언급하였다. 이에 대하여 `@Order(n)` annotation 을 사용하여 순서를 지정할 수 있다.

##### 의도적으로 SecurityFilterChain 을 거치지 않는 방법
만약 request 경로가 정적 자원(image file, CSS, HTML 등)에 해당한다면 굳이 모든 `SecurityFilterChain` 안의 `SecurityFilter` 들을 거쳐야할까?

우선 정적 자원(Static Resources)들은 공개되어야 할 file 들이다. 따라서 거칠 필요가 없다.

또한 성능 측면에서 유리하다. 정적 자원들은 그냥 서버에서 별도 처리 과정 없이 해당 자원만 response 해주면 된다. 적절한 `SecurityFilterChain` 를 선택하는 것에도 서버의 자원이 쓰이고, 적절한 `SecurityFilterChain` 을 찾은 후에도 내부의 모든 `SecurityFilter` 들을 거치는 것에도 자원이 쓰인다.

```java
@Bean  
public WebSecurityCustomizer webSecurityCustomizer() {  
    return web -> web.ignoring().requestMatchers("/img/**");  
}
```

위와 같이 `WebSecurityCustomizer` 에 대한 Bean 을 `SecurityConfig` class 에 추가해주면, 내부에 `SecurityFilter` 가 존재하지 않은 새로운 `SecurityFilterChain` 이 index `0` 번으로 등록된다.

![[images/Pasted image 20250618025528.png]]

실제로 테스트해보면 정확히 `0` 번 index 에 해당 `SecurityFilterChain` 이 등록된 것을 볼 수 있다.