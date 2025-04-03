---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Bean Lifecycle Methods
---
![[images/Pasted image 20250401195637.png]]

Spring 에서 일반적인 Bean 의 lifecycle 은 위와 같은 형식이다. 이때, Bean Lifecycle Method 를 사용하여 Bean 이 생성되고 소멸되는 시점에 추가적인 작업을 수행하도록 customize 할 수 있다.

특정 시점(initialize 또는 destory)에 실행되도록 걸어 놓은 Hook 이라고 부를 수도 있으며, 특정 이벤트(initialize 또는 destory) 발생 시에 자동으로 호출되는 method 인 점에서 Callback 이라고 부르기도 한다.

Bean Initialization 시점에서는 custom business logic methods 를 호출하거나, DB 등의 resource 관련 설정을 준비하게 할 수 있다. `@PostConstruct` annotation 을 사용하여 Lifecycle Callback 을 만들 수 있다.

마찬가지로, Bean Destruction 시점에서도 business logic 을 호출하거나 resource 관련 작업들을 정리하게 할 수 있고, `@PreDestroy` annotation 을 사용하여 Lifecycle Hook 을 만들 수 있다.

##### Bean Lifecycle Methods - Test
우선 `FootballCoach` Bean 에 대한 Bean scope 를 다시 Default 로 바꾸어주고, custom init method 와 destroy method 를 해당 Bean 에 다음과 같이 추가해주자.

```java
@Component  
public class FootballCoach implements Coach {  
	...
    // define custom init method  
    @PostConstruct  
    public void doMyStartupStuff() {  
        System.out.println("In doMyStartupStuff(): " + getClass().getSimpleName());  
    }  
  
    // define custom destroy method  
    @PreDestroy  
    public void doMyCleanupStuff() {  
        System.out.println("In doMyCleanupStuff(): " + getClass().getSimpleName());  
    }
    ...
}
```

이후 Application 을 실행하고 바로 종료시키게 되면 console 에서 다음과 같은 결과를 확인할 수 있다.

![[images/스크린샷 2025-04-02 09.32.33.png]]

먼저, `FootballCoach` 에 대한 Bean instantiated 가 된 이후에, 작성해준 init method 가 실행된 것을 알 수 있으며, Application 을 종료하기 직전에, 작성해준 destroy method 가 실행된 것을 알 수 있다.

##### ! Special Note for Prototype Scope
Bean 의 scope 를 Prototype 으로 설정해놓았다면 [[0x02. Spring Core#2. Prototype|여기에서]] 작성된 것처럼, Bean instantiated 다음에 더이상 Spring Container 가 관리하지 않는다. 실제로 Prototype 으로 scope 를 지정하고 test 해보면,

![[images/스크린샷 2025-04-02 09.39.26.png]]

과 같이 Bean 을 초기화한 이후에 init method 는 정상적으로 실행이 되었지만, Application 을 종료했음에도 destroy method 는 실행되지 않았음을 알 수 있다. 그렇다면 Prototype 으로 scope 가 지정된 Bean 들의 제어는 초기화 이후에 누가 관리하는 것일까?

바로 개발자에게 그 권한과 책임이 있다. 만약 init method 에서 DB 등과 같은 resource 들을 startup 했다면, 반드시 개발자는 직접 해당 resource 들은 release 하거나 cleanup 시켜야 한다. 즉, 개발자가 직접 destory logic 을 작성하거나 해당 기능을 수행하는 method 를 call 해야 하는 것이다.