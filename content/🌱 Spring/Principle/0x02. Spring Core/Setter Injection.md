---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Setter Injection
---
Setter Injection 은 Setter 를 이용하는 Injection 방식 중 하나이다. 

Setter 를 이용하는 방식은 간단하다. class 에 Injection 을 담당하는 method 를 하나 생성하고, `@Autowired` annotation 을 통하여 원하는 Bean object 를 Inject 해주면 된다. 이번에는 바로 code 를 작성해보자.

##### Setter Injection - Code
```java
// define a setter for dependency injection  
@Autowired  
public void setCoach(Coach theCoach) {  
    myCoach = theCoach;  
}
```

사실, Setter Injection 을 사용할 때 method 의 이름은 상관이 없다. 단순히 Injection 을 수행하는 method 그 이상 그 이하도 아니기 때문에 말이 setter 이지 사실상 일반적인 method 라 봐도 무방하다. 단지 Injection 을 수행하는 기능을 가지고 있어서 명시적으로 Setter 라는 이름을 주는 것 뿐이다.


##### Constructor vs. Setter Injection
그럼 어느 상황에 어떤 Injection 을 사용해야 하는 걸까?

Constructor Injection 은 constructor 를 이용하는 방식으로, object 생성 시점에 반드시 설정되므로 필수적인 dependency 를 처리할 때 적합하다. 

반대로 Setter Injection 은 dependency 를 선택적으로 설정할 수 있으므로 optional dependency 를 처리할 때 적합하다.