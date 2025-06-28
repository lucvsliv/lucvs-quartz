---
created: 2025-06-17
updated: 2025-06-18
dg-publish: true
title: Architecture - SecurityFilterChain 내부 구조
---
지금까지 대략적인 Spring Security 의 구조와 `SecurityFilterChain` 의 등록과정을 알아보았다. `SecurityFilterChain` 은 여러 개의 `SecurityFilter` 들로 구성되어 있다고 했는데, 과연 어떤 식으로 되어 있을지 `SecurityFilterChain` 의 내부 구조에 대하여 분석해보자.

## 내부 구조 분석
##### @EnableWebSecurity Debug Mode
```java
@EnableWebSecurity(debug = true)  
```

위와 같이 Spring Security 의 웹 보안 기능을 활성화하는 annotation 인 `@EnableWebSecurity` 에 Debug Mode 를 추가하면 좀 더 쉽게 `SecurityFilterChain` 의 내부 구조를 살펴볼 수 있다.

![[images/Pasted image 20250618031211.png]]

Debug Mode 를 사용하면 위와 같은 결과를 얻을 수 있다. `SpringConfig` class 에서 아무런 Custom `SecurityFilterChain` 을 define 하지 않고 기본 설정에서의 `SecurityFilterChain` 의 구조를 살펴보면 여러 개의 `Filter` 들이 들어가 있는 모습을 볼 수 있다.

##### Spring Security Filters
그럼 Spring Security 에서 제공하는 Filter 들에는 어떤 것들이 있을까?

| 필터명                                     | 역할 설명                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------- |
| DisableEncodeUrlFilter                  | URL에 세션ID가 인코딩되어 노출되는 것을 방지, 세션ID가 URL에 포함되지 않도록 응답을 래핑                     |
| WebAsyncManagerIntegrationFilter        | 비동기(Async) 요청 처리 시 SecurityContext가 다른 스레드에서도 공유될 수 있도록 지원                  |
| SecurityContextHolderFilter             | 접근한 사용자에 대하여 Security Context 로 관리                                          |
| HeaderWriterFilter                      | 응답에 보안 관련 HTTP 헤더(X-Frame-Options, XSS-Protection 등)를 추가                    |
| CorsFilter                              | Cross-Origin Resource Sharing(CORS) 정책 적용 및 처리                              |
| CsrfFilter                              | CSRF(Cross-Site Request Forgery) 공격 방지를 위해 CSRF 토큰 검사                       |
| LogoutFilter                            | 로그아웃 요청 처리 및 세션 무효화                                                         |
| UsernamePasswordAuthenticationFilter    | 로그인 폼의 아이디/비밀번호 인증 처리                                                       |
| DefaultResourcesFilter                  | 정적 리소스(이미지, CSS, JS 등) 요청을 처리하여 보안 필터 체인에서 제외                               |
| DefaultLoginPageGeneratingFilter        | 별도 로그인 페이지가 없을 때 기본 로그인 페이지를 자동 생성                                          |
| DefaultLogoutPageGeneratingFilter       | 별도 로그아웃 페이지가 없을 때 기본 로그아웃 페이지를 자동 생성                                        |
| BasicAuthenticationFilter               | HTTP Basic 인증 헤더(Authorization) 기반 인증 처리                                    |
| RequestCacheAwareFilter                 | 인증 전 요청 정보를 캐시하여, 인증 성공 후 원래 요청으로 리다이렉트                                     |
| SecurityContextHolderAwareRequestFilter | HttpServletRequest를 래핑하여 SecurityContext에 쉽게 접근할 수 있게 지원                    |
| AnonymousAuthenticationFilter           | 인증되지 않은 사용자를 익명 사용자로 처리                                                     |
| ExceptionTranslationFilter              | 인증/인가 실패 시 로그인 페이지 리다이렉트 또는 에러 응답 처리                                        |
| AuthorizationFilter                     | URL 및 리소스 접근 권한(인가) 검사, Spring Security 5.5부터 FilterSecurityInterceptor를 대체 |

##### Custom Filter 등록
특정 `SecurityFilterChain` 에 Filter 를 등록하고 싶다면 다음 method 들을 사용하면 된다.

```java
.addFilterBefore(customFilter, beforeFilter.class);
```

- `addFilterBefore`: 지정한 Filter 앞에 Custom Filter 를 추가
- `addFilterAfter`: 지정한 Filter 뒤에 Custom Filter 를 추가
- `addFilterAt`: 지정한 Filter 자리에(같은 order 로) Custom Filter 를 추가

그러나 같은 order 에 여러 Filter 가 존재하면 애매한 상황이 발생할 수 있으므로 특별한 경우에만 사용한다.