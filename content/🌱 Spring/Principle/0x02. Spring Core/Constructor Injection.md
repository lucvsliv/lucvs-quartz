---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Constructor Injection
---
## Constructor Injection
Constructor Injection 은 위에서 설명한대로, constructor 를 이용하는 Injection 방식이다.


![[Pasted image 20250330050108.png]]

우선 위의 시나리오를 적용해보기로 하자. 우선 `/dailyworkout` endpoint 에 접근하면, `DemoController` 라는 controller 를 통하여 `Coach` object 의 `getDailyWorkout` method 를 실행하도록 하는 방식이다.

![[Pasted image 20250330052248.png|450]]

`Coach` object 는 Dependency Injection 을 위하여 Interface 로 만들고, 이를 각각의 class 가 implements 하는 식으로 구성하면 [[DIP(Dependecy Inversion Principle)|DIP]] 도 만족할 것이다.

##### Constructor Injection - Code
```java
@RestController  
public class DemoController {  
  
    // define a private field for the dependency  
    private Coach myCoach;  
  
    // define a constructor for dependency injection  
    @Autowired  
    public DemoController(Coach theCoach) {  
        myCoach = theCoach;  
    }  
  
    @GetMapping("/dailyworkout")  
    public String getDailyWorkout() {  
        return myCoach.getDailyWorkout();  
    }  
}
```

우선 `FootballCoach` class 만을 `@Component` annotation 을 통하여 Spring Bean 으로 설정하여 Spring Container 에 저장한다. 이후 Controller 에서는 Autorwiring 을 통하여 들어온 `FootballCoach` 가 Controller 의 constructor 에 injection 된다.

즉, Constructor Injection 이 수행된 것이다.

##### Constructor Injection - Behind the Scenes
DI(Depedency Injection) 을 통하여 object 가 injection 된 것은 알겠다. 하지만 아주 잘 알고 있듯이, Java 에서는 단순히 class type 의 field 를 선언한다고 해서 해당 class 의 object 가 생기는 것은 아니다. 코드상에서는 `theCoach` 나 `DemoController` 단순히 선언만 했을 뿐 실제 object 를 생성하는 부분은 보이지 않는다.

이런 역할을 내부적으로 수행하는 것이 바로 Spring IoC Container, 위에서 언급한 Spring Container 이다. Spring Container 는 [[0x02. Spring Core#Spring Container|위에서]] 언급한 것처럼 object 를 만들고, dependency 를 injection 하는 역할을 수행한다. 따라서 Spring IoC Container 는 내부적으로 아래의 코드를 수행하는 것이다.

```java
Coach theCoach = new FootballCoach();
DemoController demoController = new DemoController(theCoach);
```

다시 한번 설명하면, 첫 번째 codeline 에서는 Spring Bean 으로 등록된 `FootballCoach` class 에 대한 실제 `theCoach` 라는 `Coach` type 의 object 를 선언한 것이고, 두 번째 codeline 에서는 `theCoach` object 를 injection 하여 Constructor 를 통한 initialization, 즉 Constructor Injection 을 수행하였다.

하지만, 이런 생각을 떠올릴 수 있다.

> 아니, 그냥 "new" keyword 를 사용해서 object 를 생성하면 되는거 아니야?
> 왜 복잡하게 Spring Container 에게 이 작업을 수행하게 하는거야.

##### Why using Spring IoC Container
물론, 작은 application 에 대하여 Spring Container 를 통하여 IoC 나 DI 의 이점을 잘 느끼지 못할 것이다. 하지만 Spring 은 복잡한 application 은 물론, 기업, real-time / real-world application 을 대상으로 한다. 또한 Database 에 대한 접근, Transacations, REST APIs, Web MVC, Spring Security 등에서 아주 효율적으로 사용된다.

뼈와 살로 얻는 것은 앞으로 더 느껴보도록 하자.