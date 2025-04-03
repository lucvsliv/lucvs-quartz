---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Java Config Beans
---
## Java Config Bean
Spring 에서 특정 class 를 Bean 으로 등록하기 위하여는 해당 class 에 `@Component` annotation 을 사용하였다. 

이 방법 말고도 `@Configuration` annotation 을 지정한 class 를 따로 만들고, 해당 class 안에서 `@Bean` annotation 을 사용한 method 를 만들어서 Bean instatiation 을 수행할 수 있다. 새로운 Class `SwimCoach` 를 Bean 으로 등록하기 위해서는 아래와 같이 사용하면 된다.

```java
@Configuration
public class SportConfig {
	@Bean 
	public Coach swimCoach() {
		return new SwimCoach();
	}
}
```

그러나 이런 의문을 가질 수 있다. 그냥 new keyword 를 사용하면 되는 것 아닌가? 그냥 단순하게 class 에 `@Component` annotation 붙이는 것이 훨씬 간단한 작업 아닌가?

우선 new keyword 에 대하여는, Spring Container 로 Bean 을 관리하는 것에 훨씬 더 많은 이점과 편리함, 효율성이 존재하다는 것을 반박으로 들 수 있다. 단순히 new keyword 를 통하여 Bean object 생성하면, Bean 에 대한 모든 lifecycle 을 개발자가 직접 관리해야 하기 때문에 어려움이 존재한다.

다음으로는, 단순히 `@Component` annotation 을 추가할 수 없는 상황이 존재한다. 만약 third-part 의 class 를 사용하고 싶을 때, 해당 class 는 read-only 인 경우가 다반사일 것이다. read-only 인 파일에 write 를 하는 것은 사실상 불가능하기 때문에, `@Configuration` 을 사용한 class 를 추가적으로 생성하여 해당 class 에서 third-party class 에 대한 Bean 을 생성할 수 있다. 

이후 Application 의 Controller 나 다른 service 에 DI 를 수행하면, third-party 에 대한 class 도 Bean 으로 등록하여 사용할 수 있게 되는 것이다.

##### Bean ID
Bean ID 는 Spring Container 에서 Bean 들을 구별할 수 있는 고유한 이름이다.

기본적으로 Bean ID 는 해당 class 이름의 첫 번째 글자를 소문자로 바꾼 것을 사용한다. 따라서 아래와 같이 Qualifier 를 통하여 Injection 을 수행할 때 `swimCoach` 를 사용한 걸 알 수 있다.

```java
// define a constructor for dependency injection  
@Autowired  
public DemoController(@Qualifier("swimCoach") Coach theCoach) {  
    System.out.println("In constructor: " + getClass().getSimpleName()); 
    myCoach = theCoach;  
}
```

Bean ID 를 직접 configure 할 수 있는데, 단순하게 `@Bean` annotation 을 사용하는 것이 아니라 `@Bean("aquatic")` 와 같이 Bean ID 를 직접 지정하여 사용할 수 있다. 해당 Bean 을 Injection 할 때도 `@Qualifier("aquatic")` 와 같이 작성하면 된다.