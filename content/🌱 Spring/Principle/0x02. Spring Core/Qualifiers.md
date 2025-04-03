---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Qualifiers
---
## Qualifiers
지금까지는 `@Component` annotation 이 붙은 Coach type 의 class 가 하나밖에 없었다.

그렇다면, 만약 여러개가 있었을 경우에 어떤 Bean object 를 inject 해야 할까?

##### Using Qualifiers
`@Qualifiers` annotation 을 사용함으로써 문제를 해결할 수 있다. Qualifier 를 통하여 특정 type 에 대한 Bean 들 중에서 특정 이름을 가진 class 만을 qualify, 즉 자격을 주는 것이다.

##### Qualifiers - Test
우선 Qualifier 를 사용하지 않고 `@Component` annotation 을 사용하여 추가적인 Bean 을 생성한 이후에 Application 을 실행해보면 다음과 같다. 참고로 Injection 방식을 Constructor Injection 으로 설정하였다.

![[스크린샷 2025-04-01 09.39.02.png]]

보면 single bean 이 요구되지만 4개가 발견되었다고 한다. 역시 의도대로 나온 오류이다.

이제 Qualifier 를 사용하여 오류를 수정해보자.

```java
// define a constructor for dependency injection  
@Autowired  
public DemoController(@Qualifier("footballCoach") Coach theCoach) {  
    myCoach = theCoach;  
}
```

위와 같이 explicit 한 type casting 을 해주는 syntax 처럼 `@Qualifier` annotation 을 사용해주면 된다. Qualifier 로 지정하고 싶은 Bean 의 class 이름 첫글자는 lower case 로 바꾸어 지정해주면 된다.