---
created: 2025-04-03
updated: 2025-04-03
dg-publish: true
title: Dependency Injection
---
##### Dependency Injection
우선 Dependecy Injection 이라고 하는 것은 [[DIP(Dependecy Inversion Principle)|Depedency Invsersion Principle]] 을 기반으로 한다.

![[images/Pasted image 20250401185038.png]]

위에서 본 예시처럼, Spring Container 에서 생성되고 관리되는 object 들은 각각의 하위에 또다른 dependency 관계가 존재할 것이다. 예를 들어서, `FootballCoach` 는 수석 코치를, 수석 코치는 막내 코치를 필요로 하기 때문이다.

이에 대하여 `Member` class 는 Spring Container 로부터 `FootballCoach` object 를 요구할 때, `FootballCoach` 의 하위에 존재하는 모든 dependency 를 한번에 얻기를 원할 것이다.

따라서 Dependecy Injection 이란, 이렇게 객체를 원하는 `Member` 의 시선으로 보았을 때, object 간의 dependecy 를 외부에서 결정하고 자신에게 주입해주는 설계 패턴을 의미하는 것이다. (실제로는 자신에게 스스로 주입하는 것이 아니라 Spring Container 가 이를 수행한다.)

##### Injection Types
Spring 에서는 여러가지 방법으로 Injection 을 제공하고 있는데, 대표적으로 다음 두 가지의 방법이 있다.

> - Constructor Injection
> - Settter Injection

Constructor Injection 은 constructor 를 이용하는 방식으로, object 생성 시점에 반드시 설정되므로 필수적인 dependency 을 처리할 때 적합하다. 

Setter Injection 은 dependency 를 선택적으로 설정할 수 있으므로 optional dependency 를 처리할 때 적합하다.

##### Spring Autowiring
dependency injection 을 위해서 Spring 은 Autowiring 이라는 것을 사용할 수 있다. 

Autowiring 은 Dependency Injection 을 자동으로 수행해주며, `@Autowired` annotation 을 사용하여 Spring Container 에 등록된 Bean 중에서 type 이 일치하는 object 를 자동으로 찾아서 inject 해준다.

여기서 Bean 은 Spring Container 에 의해 관리되는 object 로, 개발자가 굳이 XML 파일이나 Java Source Code 에서 설정하지 않더라도 class 에 `@Component` annotation 만 추가함으로써 Spring Container 에 Bean 으로 등록할 수 있다.